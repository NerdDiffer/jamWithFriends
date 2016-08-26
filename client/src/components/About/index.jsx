import React from 'react';
import Paper from 'material-ui/Paper';
import Author from './Author';

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
        Colossal Bubble is a group of developers based in San Francisco, CA.
      </section>
      <section className="authors">
        <Author
          name="Frances Yang"
          links={{ linkedin: 'https://www.linkedin.com/in/frances-yang-07624b123', github: 'https://github.com/ffhy' }}
        />
        <Author
          name="Krishan Arya"
          links={{ linkedin: 'https://www.linkedin.com/in/krishanarya1', github: 'https://github.com/Anoninnyc' }}
        />
        <Author
          name="Greg Roche"
          links={{ linkedin: 'https://www.linkedin.com/in/gregoryrroche', github: 'https://github.com/grrman93' }}
        />
        <Author
          name="Rafael Espinoza"
          links={{ linkedin: 'https://www.linkedin.com/in/rafesp', github: 'https://github.com/NerdDiffer' }}
        />
      </section>
    </Paper>
  </div>
);

export default About;
