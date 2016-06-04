import React, { PropTypes } from 'react';
import TopicTextInput from 'components/RoomTextInput';


// Takes callback functions from props and passes it down to TopicTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move TopicTextInput up to EntryBox so it's less confusing
const EntryBox = ({onEntryChange, onEntrySave, room}) => {
  return (
    <div className={'entrybox'}>
      <h1 className={'header'}>Vote for your top hack idea</h1>
      <TopicTextInput
        className={'input'}
        value={room}
        placeholder="Create A Comm Cell meeting room"
        onEntryChange={onEntryChange}
        onEntrySave={onEntrySave} />
    </div>
  );
};

EntryBox.propTypes = {
  topic: PropTypes.string,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired
};

export default EntryBox;
