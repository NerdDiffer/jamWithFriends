import React from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
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
    <Paper style={aboutAuthorsStyle}>
      <section className="group">
        <p>Colossal Bubble is a group of developers based in San Francisco, CA.</p>
        <p>
          The source code is available on <Link to="https://github.com/ColossalBubble/jamWithFriends" target="_blank">GitHub</Link>
        </p>
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
