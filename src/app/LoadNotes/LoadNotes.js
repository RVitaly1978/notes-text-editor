import { useDispatch } from 'react-redux';
import { preLoadDataThunk } from '../../features/storage/storageSlice';
import s from './LoadNotes.module.scss';

const LoadNotes = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(preLoadDataThunk());
  };

  return (
    <button
      className={s.button}
      onClick={handleClick}
    >
      Load Notes
    </button>
  );
};

export default LoadNotes;
