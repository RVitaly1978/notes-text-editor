import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import { createNoteThunk } from '../../features/notes/notesSlice';
import { markTagsInText } from '../../helpers/markTags';
import s from './NoteCreator.module.scss';

const NoteCreator = () => {
  const dispatch = useDispatch();
  const contentEditable  = useRef('');
  const [text, setText] = useState('');

  const handleCreate = () => {
    if (!text) {
      return;
    }

    dispatch(createNoteThunk(text));
    setText('');
  };

  const handleClear = () => {
    contentEditable.current.focus();
    setText('');
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setText(markTagsInText(value));
  };

  return (
    <div className={s.container}>
      <ContentEditable
        className={s.contentEditable}
        innerRef={contentEditable}
        onChange={handleChange}
        html={text}
        // placeholder='Type new note'
      />

      <div className={s.buttonsGroup}>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

export default NoteCreator;
