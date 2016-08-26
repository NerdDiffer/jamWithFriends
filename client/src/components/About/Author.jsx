import React from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import { white } from 'material-ui/styles/colors';
import InstrumentIcon, { KickDrumIcon } from '../../icons';

const Author = ({ name, links }) => (
  <div className="author">
    <h1>{ name }</h1>
    <Link to={links.linkedin}  target="_blank" className="authorLink">LinkedIn</Link>
    <Link to={links.github}  target="_blank" className="authorLink">GitHub</Link>
  </div>
);


Author.propTypes = {
  name: React.PropTypes.string.isRequired,
  links: React.PropTypes.object.isRequired
};

export default Author;
