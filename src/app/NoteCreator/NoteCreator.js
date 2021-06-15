import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../../features/notes/notesSlice';
import s from './NoteCreator.module.scss';

const NoteCreator = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [note, setNote] = useState('');

  const handleCreate = () => {
    if (!note) {
      return;
    }

    dispatch(addNote({ text: note, tags: [] }));
    setNote('');
  };

  const handleClear = () => {
    setNote('');
    ref.current.focus();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setNote(value);
  };

  return (
    <div className={s.container}>
      <textarea
        ref={ref}
        onChange={handleChange}
        value={note}
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
