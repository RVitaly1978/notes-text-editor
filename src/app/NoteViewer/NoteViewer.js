import { useDispatch, useSelector } from 'react-redux';
import { updateNote, deleteNote, selectNoteById } from '../../features/notes/notesSlice';
import NoteEditMode from '../NoteEditMode/NoteEditMode';
import NoteViewMode from '../NoteViewMode/NoteViewMode';
import s from './NoteViewer.module.scss';

const NoteViewer = ({ id }) => {
  const dispatch = useDispatch();
  const note = useSelector((state) => selectNoteById(state, id));

  const handleDelete = () => {
    dispatch(deleteNote({ id }));
  };

  const handleEdit = () => {
    dispatch(updateNote({ id, isEditMode: !note.isEditMode }));
  };

  return (
    <div className={s.container}>
      {note.isEditMode ? (
        <NoteEditMode id={id} />
        ) : (
        <NoteViewMode  id={id} />
      )}

      <button
        onClick={handleDelete}
      >Delete</button>

      <button
        onClick={handleEdit}
      >Edit</button>
    </div>
  );
};

export default NoteViewer;
