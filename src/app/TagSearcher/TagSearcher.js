import { useDispatch, useSelector } from 'react-redux';
import { updateSearch, selectSearch, selectAllTagsIds } from '../../features/tags/tagsSlice';
import s from './TagSearcher.module.scss';

const TagSearcher = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const items = useSelector(selectAllTagsIds);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value !== search) {
      dispatch(updateSearch(value));
    }
  };

  return (
    <div className={s.container}>
      <input className={s.search}
        type='search'
        placeholder='Search tags'
        value={search}
        onChange={handleChange}
        disabled={!items.length}
      />
    </div>
  );
};

export default TagSearcher;
