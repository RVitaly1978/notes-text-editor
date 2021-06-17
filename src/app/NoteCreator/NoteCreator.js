import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import { addNote } from '../../features/notes/notesSlice';
import { markTags, unmarkTags } from '../../helpers/markTags';
import s from './NoteCreator.module.scss';

const NoteCreator = () => {
  const dispatch = useDispatch();
  const contentEditable  = useRef('');
  const [text, setText] = useState('');

  const handleCreate = () => {
    if (!text) {
      return;
    }

    dispatch(addNote({ content: text, tags: [] }));
    setText('');
  };

  const handleClear = () => {
    contentEditable.current.focus();
    setText('');
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const unmarked = unmarkTags(value);
    const marked = markTags(unmarked);
    setText(marked);
  };

  return (
    <div className={s.container}>
      <ContentEditable
        className={s.contentEditable}
        innerRef={contentEditable}
        onChange={handleChange}
        html={text}
      />

      <button
        onClick={handleClear}
      >Clear</button>

      <button
        onClick={handleCreate}
      >Create</button>
    </div>
  );
};

export default NoteCreator;
