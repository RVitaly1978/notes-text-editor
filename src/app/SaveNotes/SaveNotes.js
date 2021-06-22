import { useDispatch, useSelector } from 'react-redux';
import { saveDataThunk } from '../../features/storage/storageSlice';
import { selectAllNotesIds } from '../../features/notes/notesSlice';
import s from './SaveNotes.module.scss';

const SaveNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectAllNotesIds);

  const handleClick = () => {
    dispatch(saveDataThunk());
  };

  return (
    <button
      className={s.button}
      disabled={!notes.length}
      onClick={handleClick}
    >
      Save Notes
    </button>
  );
};

export default SaveNotes;
