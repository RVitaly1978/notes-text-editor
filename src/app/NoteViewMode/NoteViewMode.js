import { useSelector } from 'react-redux';
import { selectNoteById } from '../../features/notes/notesSlice';
import s from './NoteViewMode.module.scss';

const NoteViewMode = ({ id }) => {
  const note = useSelector((state) => selectNoteById(state, id));

  return (
    <div className={s.container}>
      {note.text}
    </div>
  );
};

export default NoteViewMode;
