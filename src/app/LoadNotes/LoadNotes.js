import { useDispatch } from 'react-redux';
import { preLoadDataThunk } from '../../features/storage/storageSlice';
import s from './LoadNotes.module.scss';

const LoadNotes = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(preLoadDataThunk());
  };

  return (
    <div className={s.container}>
      <button
        onClick={handleClick}
      >
        Load
      </button>
    </div>
  );
};

export default LoadNotes;
