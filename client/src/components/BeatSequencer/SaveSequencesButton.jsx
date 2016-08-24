import React from 'react';
import IconButton from 'material-ui/IconButton';

const SaveSequencesButton = ({ handleClick }) => (
  <div className="addSequence" onClick={handleClick}>
    <IconButton iconClassName="material-icons">save</IconButton>
  </div>
);

SaveSequencesButton.propTypes = {
  handleClick: React.PropTypes.func.isRequired
};

export default SaveSequencesButton;
