import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNoteThunk } from '../../features/notes/notesSlice';
import { markTagsInText } from '../../helpers/markTags';
import ContentEditable from '../ContentEditable/ContentEditable';
import s from './NoteCreator.module.scss';

const NoteCreator = () => {
  const dispatch = useDispatch();
  const contentEditable  = useRef('');
  const [text, setText] = useState('');
  const [caretPosition, setCaretPosition] = useState(null);

  const handleCreate = () => {
    if (!text) {
      return;
    }

    dispatch(createNoteThunk(text));
    setText('');
  };

  const handleClear = () => {
    setText('');
    contentEditable.current.focus();
  };

  const handleChange = (e) => {
    const { value, caretPosition } = e.target;
    setText(markTagsInText(value));
    setCaretPosition(caretPosition);
  };

  return (
    <div className={s.container}>
      {!text && <span className={s.label}>Type note</span>}

      <ContentEditable
        className={s.contentEditable}
        caret={caretPosition}
        html={text}
        innerRef={contentEditable}
        onChange={handleChange}
      />

      <div className={s.buttonsGroup}>
        <button onClick={handleClear} disabled={!text}>Clear</button>
        <button onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

export default NoteCreator;
