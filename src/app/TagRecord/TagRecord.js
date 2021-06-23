import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTagById, updateTag } from '../../features/tags/tagsSlice';
import { FilterIcon } from '../Icons';
import s from './TagRecord.module.scss';

const TagRecord = ({ id }) => {
  const dispatch = useDispatch();
  const tag = useSelector((state) => selectTagById(state, id));

  const handleCheck = () => {
    dispatch(updateTag({ id, filter: !tag.filter }));
  };

  return (
    <label className={s.input}>
      <input
        type='checkbox'
        onChange={handleCheck}
        checked={tag.filter}
      />
      <span className={s.iconBox}>
        <FilterIcon />
      </span>
      <span className={s.tag}>{tag.content}</span>
    </label>
  );
};

export default memo(TagRecord);
