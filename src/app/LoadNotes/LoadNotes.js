import { useDispatch } from 'react-redux';
import { preLoadDataThunk } from '../../features/storage/storageSlice';

const LoadNotes = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(preLoadDataThunk());
  };

  return (
    <button onClick={handleClick}>
      Load Notes
    </button>
  );
};

export default LoadNotes;
