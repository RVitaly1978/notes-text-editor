import { useDispatch, useSelector } from 'react-redux';
import { selectTagById, updateTag } from '../../features/tags/tagsSlice';
import s from './TagRecord.module.scss';

const TagRecord = ({ id }) => {
  const dispatch = useDispatch();
  const tag = useSelector((state) => selectTagById(state, id));

  const handleCheck = () => {
    dispatch(updateTag({ id, filter: !tag.filter }));
  };

  return (
    <div className={s.container}>
      {tag.content}

      <input
        type='checkbox'
        onChange={handleCheck}
        checked={tag.filter}
      />
    </div>
  );
};

export default TagRecord;
