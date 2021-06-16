import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import { addNote } from '../../features/notes/notesSlice';
import s from './NoteCreator.module.scss';

const NoteCreator = () => {
  const dispatch = useDispatch();
  const contentEditable  = useRef('');
  const contentRef = useRef('');

  const handleCreate = () => {
    if (!contentRef.current) {
      return;
    }

    dispatch(addNote({ content: contentRef.current, tags: [] }));
    contentRef.current = '';
    contentEditable.current.innerHTML = '';
  };

  const handleClear = () => {
    contentRef.current = '';
    contentEditable.current.innerHTML = '';
    contentEditable.current.focus();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    contentRef.current = value;
  };

  return (
    <div className={s.container}>
      <ContentEditable
        innerRef={contentEditable}
        onChange={handleChange}
        html={contentRef.current}
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
