import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { noteAdd } from '../../features/notes/notesSlice';
import s from './NoteCreator.module.scss';

const NoteCreator = () => {
  const dispatch = useDispatch();
  const [note, setNote] = useState('');

  const handleClick = () => {
    dispatch(noteAdd({ text: note, tags: [] }));
    setNote('');
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

export default NoteCreator;
