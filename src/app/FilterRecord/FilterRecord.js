import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTagById, updateTag } from '../../features/tags/tagsSlice';
import { CloseIcon } from '../Icons';
import s from './FilterRecord.module.scss';

const FilterRecord = ({ id }) => {
  const dispatch = useDispatch();
  const tag = useSelector((state) => selectTagById(state, id));

  const handleClick = () => {
    dispatch(updateTag({ id, filter: false }));
  };

  return (
    <div className={s.container}>
      {tag.content}

      <button className={s.button} onClick={handleClick}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default memo(FilterRecord);
