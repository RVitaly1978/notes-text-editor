import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote, deleteNote } from '../../features/notes/notesSlice';
import NoteEditMode from '../NoteEditMode/NoteEditMode';
import s from './NoteRecord.module.scss';

const NoteRecord = ({ id }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleDelete = () => {
    dispatch(deleteNote({ id }));
  };

  const handleEdit = () => {
    dispatch(updateNote({ id, isEditMode: true }));
  };

  const handleFocus = () => {
    dispatch(updateNote({ id, isViewMode: true }));
  };

  const handleBlur = () => {
    dispatch(updateNote({ id, isViewMode: false }));
  };

  const getFocus = () => {
    ref.current.focus();
  }

  return (
    <div className={s.container}
      ref={ref}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={1}
    >
      <NoteEditMode id={id} getFocus={getFocus} />

      <button
        onClick={handleDelete}
      >Delete</button>

      <button
        onClick={handleEdit}
      >Edit</button>
    </div>
  );
};

export default NoteRecord;
