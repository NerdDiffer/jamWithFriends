import React from 'react';
import IconButton from 'material-ui/IconButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import { white } from 'material-ui/styles/colors';
import InstrumentIcon, { KickDrumIcon } from '../../icons';

const Author = ({ name, links }) => (
  <div className="author">
    <h1>{ name }</h1>
    <p><a href={links.linkedin} target="_blank">LinkedIn</a></p>
    <p><a href={links.github} target="_blank">GitHub</a></p>
  </div>
);


Author.propTypes = {
  name: React.PropTypes.string.isRequired,
  links: React.PropTypes.object.isRequired
};

export default Author;
