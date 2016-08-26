import React from 'react';
import Paper from 'material-ui/Paper';

const aboutAppStyles = {
  width: 400,
  margin: '0 auto',
  padding: '1%'
};

const aboutAuthorsStyle = {
  margin: '0 auto',
  padding: '1%',
};

const About = (props) => (
  <div className="about">
    <Paper style={aboutAppStyles}>
      <section>
        <p>LiveJam allows music aficianados to collaboratively jam out using virtual instruments.</p>
        <p>The app lets “Jammers” form or join dedicated rooms where they can create tracks (and lifetime memories) with one another.</p>
        <p>LiveJam’s rooms currently allow for up to four Jammers to collab per session.</p>
        <p>The app's use of direct peer-to-peer (serverless) communication, via WebRTC, allows users within 100 miles of one another to jam without lag, emulating the experience of using a real studio.</p>
      </section>
    </Paper>

    <hr />

    <Paper style={aboutAuthorsStyle}>
      <section className="group">
      </section>
      <section className="authors">
        <section className="author">
        </section>
      </section>
    </Paper>
  </div>
);

export default About;
