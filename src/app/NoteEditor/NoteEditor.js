import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { noteAdd } from '../../features/notes/notesSlice';
import s from './NoteEditor.module.scss';

const NoteEditor = () => {
  const dispatch = useDispatch();
  const [note, setNote] = useState('');

  const handleClick = () => {
    dispatch(noteAdd({ text: note, tags: [] }));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setNote(value);
  };

  return (
    <div className={s.container}>
      <textarea
        onChange={handleChange}
        value={note}
      />

      <button
        onClick={handleClick}
      >Save</button>
    </div>
  );
};

export default NoteEditor;
