import React, { PropTypes } from 'react';
import TextInput from './TextInput';


// Takes callback functions from props and passes it down to TopicTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move TopicTextInput up to EntryBox so it's less confusing
const EntryBox = ({onEntryChange, onEntrySave, room}) => {
  return (
    <div className={'help-search'}>
      <TextInput
        value={room}
        placeholder="Add a meeting room"
        onEntryChange={onEntryChange}
        onEntrySave={onEntrySave}
        />
    </div>
  );
};

EntryBox.propTypes = {
  topic: PropTypes.string,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired
};

export default EntryBox;
