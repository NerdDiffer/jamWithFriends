/* Requires */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
const shortid = require('shortid');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const expressSession=require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
require("dotenv").config();

const routes = require('./routes');

/* Init */
const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

/* DB  */

const users = require('./db/models').users;
const instruments = require('./db/models').instruments;
const PrivateRooms = require('./db/models').PrivateRooms;


/* Middleware */
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pathToStaticDir = path.resolve(__dirname, '..', 'client/public');

app.use(express.static(pathToStaticDir));
app.use(express.static(pathToStaticDir, { redirect: false }));

/* Auth */
app.use(expressSession({
  secret: process.env.sessions_secret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const fbConfig = {
  clientID: process.env.client_Id,
  clientSecret: process.env.client_Secret,
  callbackURL: process.env.callbackURL
};

passport.use(new FacebookStrategy(fbConfig, (accessToken, refreshToken, profile, done) => {
  console.log('this is the profile', profile);
  users.findAll({ where: { facebookId: profile.id } })
    .then(user => {
      if (user.length > 0) {
        console.log('user already exists', user[0]);
        return done(null, user);
      } else {
        return users.create({
          userName: `${profile.name.givenName} ${profile.name.familyName}`,
          password: "N/A",
          facebookId: profile.id,
          token: accessToken,
        }).then(entry => {
          console.log('this is entry for a newly added user', entry.dataValues.id);
          console.log(entry.dataValues, ' got entered', entry);
          return done(null, entry.dataValues.id);
        });
      }
    });
}
));

// serialize and deserialize
passport.serializeUser((user, done) => {
  const final = typeof user==="number"?user:user[0].dataValues.id;
  console.log('this is the user param', user);
  console.log('serializing!!!', final);
  done(null, final);
});

passport.deserializeUser((id, done) => {
  console.log('this is id in deserialize', id);
  users.findAll({ where: { id } })
    .then(found => {
      const values = found[0].dataValues;
      console.log('Trying to "deserialize" this user', values);
      done(null, id);
    });
});

/* Sockets */
// rooms for peer connection sockets
const rooms = {};
// map actual rooms to another room which contains peer info sockets
const listenerRooms = {};

io.on('connection', socket => {
  console.log('Socket connected with ID: ', socket.id);

  io.to(socket.id).emit('connected');

  socket.on('create room', roomId => {
    if (rooms[roomId]) {
      io.to(socket.id).emit('room name taken');
    } else {
      rooms[roomId] = [];
      io.to(socket.id).emit('room created', roomId);
    }
  });

  socket.on('join', roomId => {
    console.log(socket.id, 'joining', roomId);
    // does room exist?
    if (!rooms[roomId]) {
      io.to(socket.id).emit('invalid room');
    // is room full?
    } else if (rooms[roomId].length >= 4) {
      socket.emit('full', roomId);
    } else {
      socket.join(roomId);
      rooms[roomId].push({ peerId: socket.id.slice(2), instrument: 'piano' });
      console.log('room is', rooms[roomId]);

      // update open rooms table
      io.emit('give rooms info', getRoomsInfo(rooms));

      // emit message to socket which just joined
      io.to(socket.id).emit('joined', JSON.stringify(rooms[roomId]));
      // emit message to other sockets in room
      socket.broadcast.to(roomId).emit('new peer');

      socket.on('disconnect', () => {
        const socketsInRoom = rooms[roomId];
        const id = socket.id.slice(2);
        // check to make sure peer is in room and get index of peer
        for (let i = 0; i < socketsInRoom.length; i++) {
          if (socketsInRoom[i].peerId === id) {
            socketsInRoom.splice(i, 1);
            socket.leave(roomId);
            socket.broadcast.to(roomId).emit('remove connection', id);

            // update open rooms table
            io.emit('give rooms info', getRoomsInfo(rooms));

            // give updated list of peer info
            io.to(listenerRooms[roomId]).emit('receive peer info', JSON.stringify(rooms[roomId]));
            break;
          }
        }
      });
    }
  });

  socket.on('exit room', data => {
    const room = rooms[data.roomId];
    if (room !== undefined) {
      // check to make sure peer is in room and get index of peer
      for (let i = 0; i < room.length; i++) {
        if (room[i].peerId === data.id) {
          room.splice(i, 1);
          socket.leave(data.roomId);
          console.log(rooms[data.roomId]);
          socket.broadcast.to(data.roomId).emit('remove connection', data.id);

          // update open rooms table
          io.emit('give rooms info', getRoomsInfo(rooms));

          // give updated list of peer info
          io.to(listenerRooms[data.roomId]).emit('receive peer info', JSON.stringify(room));
          // disconnect socket, client will create new socket when it starts
          // peer connection process again
          socket.disconnect(0);
          break;
        }
      }
    }
  });

  socket.on('offer', offer => {
    io.to(`/#${offer.to}`).emit('offer', offer);
  });

  socket.on('answer', answer => {
    io.to(`/#${answer.to}`).emit('answer', answer);
  });

  socket.on('newInstCreated', instrument => {
    console.log('this is a brand new instrument', instrument, instrument.A);
    instruments.create({
      userName: instrument.userName,
      instrumentName: instrument.name,
      A: JSON.stringify(instrument.A),
      S: JSON.stringify(instrument.S),
      D: JSON.stringify(instrument.D),
      F: JSON.stringify(instrument.F),
      G: JSON.stringify(instrument.G),
      H: JSON.stringify(instrument.H),
      J: JSON.stringify(instrument.J),
      K: JSON.stringify(instrument.K),
      L: JSON.stringify(instrument.L)
    }).then(instrumentEntry => {
      console.log(instrumentEntry.dataValues, ' got entered');
    });
  });

  socket.on('get rooms info', id => {
    // send info to populate creaorjoin open room table
    io.to(`/#${id}`).emit('give rooms info', getRoomsInfo(rooms));
  });

  // add this socket as listener to a room mapped from client room
  // need to do this because using a different socket from one used
  // to establish rtc connections
  socket.on('add as listener', room => {
    listenerRooms[room] = listenerRooms[room] || shortid.generate();
    socket.join(listenerRooms[room]);
  });

  socket.on('select instrument', data => {
    const room = rooms[data.roomId];
    // update instrument of user
    for (let i = 0; i < room.length; i++) {
      if (room[i].peerId === data.id) {
        room[i].instrument = data.instrument;
        const updateRoom = JSON.stringify(room);

        // send out updated info of user instruments
        io.to(listenerRooms[data.roomId]).emit('receive peer info', updateRoom);

        // update open rooms table
        io.emit('give rooms info', getRoomsInfo(rooms));
        break;
      }
    }
  });

  socket.on('request peer info', data => {
    io.to(`/#${data.socketId}`).emit('receive peer info', JSON.stringify(rooms[data.roomId]));
  });

  function getRoomsInfo(roomObj) {
    const roomNames = Object.keys(roomObj);
    const container = [];
    for (let i = 0; i < roomNames.length; i++) {
      container.push({
        roomName: roomNames[i],
        numPeople: roomObj[roomNames[i]].length,
        instruments: roomObj[roomNames[i]].map(peer => peer.instrument),
      });
    }
    return container;
  }
});

/* Routes */
app.get('/logout', (req, res) => {
  console.log('mysession', req.session);
  if (req.session.userName) {
    delete req.session.userName;
  }
  req.logout();
  console.log('mysession after logout', req.session);
  res.sendStatus(200);
});


app.post('/login', (req, res) => {
  console.log('req.body.pass', req.body.pass);
  users.findAll({
    where: {
      userName: req.body.user,
    }
  }).then(person => {
    if (person[0]===undefined) {
      console.log('BadLogin');
      res.send("");
    } else {
      console.log(person[0], 'Person[0]!!!');
      const hash = bcrypt.hashSync(req.body.pass, person[0].dataValues.salt);

      users.findAll({
        where: {
          userName: req.body.user,
          password: hash
        }
      }).then(user => {
        if (user.length > 0) {
          instruments.findAll({
            where: {
              userName: req.body.user
            }
          }).then(
            userInstruments => (
               userInstruments.map(a => a.dataValues)
            )).then(userInstrumentsList => {
              console.log("succ logged in", userInstrumentsList);
              req.session.userName = req.body.user;
              res.send(userInstrumentsList);
            });
        } else {
          console.log('BadLogin');
          res.send("");
        }
      });
    }
  });
});

app.post('/signup', (req, res) => {
  users.findAll({
    where: {
      userName: req.body.user
    }
  }).then(user => {
    if (user.length > 0) {
      console.log('this is req.sesion', req.session);
      res.send('UserAlreadyExists');
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.pass, salt);
      users.create({
        userName: req.body.user,
        password: hash,
        salt,
      }).then(entry => {
        console.log(entry.dataValues, ' got entered');
        req.session.userName = req.body.user;
        res.send('SuccessSignup');
      });
    }
  });
});

app.get('/MakeInstrument', (req, res) => {
  console.log("youre trying to access make Instrument!!!");

  if (!req.session.userName&&!req.session.passport) {
    res.redirect("/login");
  } else {
    console.log("Do nothing");
  }
});

app.get('/api/beats', routes.beats.index);
app.post('/api/beats', routes.beats.newBeat);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
  })
);

app.get("/userLoggedInToMakeInst", (req, res) => {
  const person=req.session.userName||req.session.passport;
  console.log(person, 'person!!!');

  if (req.session.passport) {
    // users.findAll({ where: { id: person.user } }).then(
    instruments.findAll({ where: { id: person.user } }).then(
        userInstruments => (
           userInstruments.map(a => a.dataValues)
        )).then(userInstrumentsList => {
          console.log(person, userInstrumentsList, 'userInsts');
          res.send([person, userInstrumentsList]);
        });
  } else {
    instruments.findAll({ where: { userName: person } }).then(
        userInstruments => (
           userInstruments.map(a => a.dataValues)
        )).then(userInstrumentsList => {
          console.log(person, userInstrumentsList, 'userInsts');
          res.send([person, userInstrumentsList]);
        });
  }
});

app.get("/fbLoggedIn?", (req, res) => {
  console.log(req.session.passport);
  res.send(req.session.passport ? "true" : "false");
});

app.get('*', (req, res) => {
  console.log('req.session', req.session);
  const pathToIndex = path.join(pathToStaticDir, 'index.html');
  res.status(200).sendFile(pathToIndex);
});

app.post('/makeprivateroom', (req, res) => {
  if (!req.session.userName && !req.session.passport) {
    res.send('you must be logged in');
    console.log('User must be logged in to make private room');
  } else {
    console.log('making private rooms');
    users.findOne({
      where: {
        userName: req.session.userName,
      }
    })
    .then((user) => {
      const userId = user.id;
      return PrivateRooms.create({
        url: req.body.roomName,
        userId,
      });
    })
    .then(() => {
      res.sendStatus(200);
    });
  }
});

/* Kick off server */
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Listening on port', port);
});
