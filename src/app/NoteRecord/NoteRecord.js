import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote, deleteNoteThunk } from '../../features/notes/notesSlice';
import NoteEditMode from '../NoteEditMode/NoteEditMode';
import { DeleteIcon, EditIcon } from '../Icons';
import s from './NoteRecord.module.scss';

const NoteRecord = ({ id }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleDelete = () => {
    dispatch(deleteNoteThunk(id));
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
    <div className={s.container}>
      <div className={s.editor}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={1}
      >
        <NoteEditMode id={id} getFocus={getFocus} />
      </div>

      <div className={s.buttonsGroup}>
        <button onClick={handleDelete}><DeleteIcon /></button>
        <button onClick={handleEdit}><EditIcon /></button>
      </div>
    </div>
  );
};

export default NoteRecord;
