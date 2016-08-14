import React from 'react';
import Paper from 'material-ui/Paper';

const paperStyle = {
  height: 300,
  width: 400,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundImage: 'url("http://bit.ly/2b2ePzs")',
  borderRadius: '12%',
  opacity: 0.6,
  padding: '5px',
  fontWeight: 900,
  fontFamily: '"Trebuchet MS", Helvetica, sansSerif'
};

const About = (props) => (
  <Paper style={paperStyle} zDepth={5} >
    <div id="introText">
      <p>LiveJam allows music aficianados to collaboratively jam out using virtual instruments.</p>
      <p>The app lets “Jammers” form or join dedicated rooms where they can create tracks (and lifetime memories) with one another.</p>
      <p>LiveJam’s rooms currently allow for up to four Jammers to collab per session.</p>
      <p>The app's use of direct peer-to-peer (serverless) communication, via WebRTC, allows users within 100 miles of one another to jam without lag, emulating the experience of using a real studio.</p>
    </div>
  </Paper>
);

export default About;
