import AppBar from 'material-ui/AppBar';
import React from 'react';
import { Link } from 'react-router';

const styles = {
  backgroundColor: 'Peru'
};

const Icon = () => (
  <i className="material-icons">music_note</i>
);

const AppNavBar = () => (
  <div id="navBar">
    <AppBar
      title={'tbd'}
      style={styles}
      iconElementLeft={<Icon />}
      onTitleTouchTap={() => console.log('Go home')}
    >
      <Link to="about">
        <button className="navButtons">About</button>
      </Link>
      <Link to="login" >
        <button className="navButtons">Login</button>
      </Link>
      <Link to="signup">
        <button className="navButtons">Signup</button>
      </Link>
    </AppBar>
  </div>
);

AppNavBar.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default AppNavBar;
