import { useSelector } from 'react-redux';
import { selectAllTagsIds } from '../../features/tags/tagsSlice';
import TagRecord from '../TagRecord/TagRecord';
import s from './TagsList.module.scss';

const TagsList = () => {
  // const dispatch = useDispatch();
  const allTagsIds = useSelector(selectAllTagsIds);

  // const handleClick = (_, id) => {
  //   dispatch(setCurrentNote({ id }));
  // };

  let tagsList = 'No notes tags';

  if (allTagsIds.length !== 0) {
    tagsList = allTagsIds.map((id) => (
      // <li key={id} onClick={(e) => handleClick(e, id)}>
      <li key={id}>
        <TagRecord id={id} />
      </li>
    ));
  }

  return (
    <div className={s.container}>
      <ul>{tagsList}</ul>
    </div>
  );
};

export default TagsList;
