const beats = require('../db/models').beats;

// return all user beats
module.exports.index = (req, res) => {
  beats.findAll()
    .then(results => {
      res.status(200).send(results);
    });
};

// add a new user beat
module.exports.newBeat = (req, res) => {
  const sequences = req.body.sequences;
  console.log(sequences);
  const json = JSON.stringify(sequences);
  beats.create({ sequences: json })
    .then((sequence) => {
      res.status(200).send(sequence);
    });
};
