import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import JamRoom from './components/JamRoom';
import Room from './components/Room';
import Invalid from './components/Invalid';
import Metronome from './components/Metronome';
import About from './components/About';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="room/:roomId" component={Room} />
      <Route path="metronome" component={Metronome} />
      <Route path="about" component={About} />
      <Route path="*" component={Invalid} />
    </Route>
  </Router>
), document.getElementById('app'));
