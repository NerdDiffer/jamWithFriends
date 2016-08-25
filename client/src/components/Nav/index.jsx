import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import $ from "jquery";
import { Link } from 'react-router';
import NavMenuIcon from './NavMenuIcon';

class AppNavBar extends Component {

  componentDidMount() {
    $.get("/fbLoggedIn?", (response, err) => {
      if (response !== "false") {
        this.logIn(response);
      }
    });
  }

  clearSessions() {
    $.get("/logout", (resp, err) => {
      this.props.logOut();
    });
  }

  render() {
    return (
      <div id="navBar">
        <AppBar
          showMenuIconButton={false}
          title="tbd"
          titleStyle={{ color: '#E8AEB7' }}
          onTitleTouchTap={() => { this.context.router.push('/'); }}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          iconElementRight={<NavMenuIcon id="menuicon"/>}
        />
      </div>
    ); }
  }

AppNavBar.contextTypes = {
  router: React.PropTypes.object
};

AppNavBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
  user: React.PropTypes.string.isRequired,
  logOut: React.PropTypes.func.isRequired,
};

export default AppNavBar;
