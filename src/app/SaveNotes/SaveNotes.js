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
    <div className={s.container}>
      <button
        disabled={!notes.length}
        onClick={handleClick}
      >
        Save
      </button>
    </div>
  );
};

export default SaveNotes;
