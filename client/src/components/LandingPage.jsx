import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import shortid from 'shortid';

import { socket } from '../peer';

const materialStyles = {
  width: '25rem',
  margin: '0 auto',
  display: 'block'
};

const jamNowLabelStyles = {
  fontSize: '3rem',
  textTransform: 'none'
};

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const hash = shortid.generate();
    socket.emit('create room', hash);
    this.context.router.push(`room/${hash}`);
  }

  render() {
    return (
      <div id="landingPage">
        <section className="title">
          <h1>WELCOME TO TBD!</h1>
        </section>
        {/*
        <section className="joinRoom">
          <TextField style={materialStyles} />
          <RaisedButton
            label="Join Room"
            style={materialStyles}
          />
        </section>
        <section className="divider">
          <Divider />
        </section>
        */}
        <section className="createRoom">
          <h2 className="callToAction">What are you waiting for?</h2>
          <RaisedButton
            style={materialStyles}
            label="Jam Now!"
            labelStyle={jamNowLabelStyles}
            onClick={this.handleClick}
          />
        </section>
      </div>
    );
  }
}

LandingPage.contextTypes = {
  router: React.PropTypes.object
};

export default LandingPage;


// <img src="http://bit.ly/2aQnqlf" />
//         <img src="http://bit.ly/2aUzQtW" />
//         <img src="http://bit.ly/2bene30" />
//         <img src=" http://bit.ly/2aRmWLh" />
//         <img src=" http://bit.ly/2bf5qGu" />
