import { useSelector } from 'react-redux';
import { selectSearchedTagsIds } from '../../features/tags/tagsSlice';
import TagRecord from '../TagRecord/TagRecord';
import s from './TagsList.module.scss';

const TagsList = () => {
  const tagsIds = useSelector(selectSearchedTagsIds);

  let tagsList = 'No tags';

  if (tagsIds.length !== 0) {
    tagsList = tagsIds.map((id) => (
      <li key={id} className={s.listItem}>
        <TagRecord id={id} />
      </li>
    ));
  }

  return (
    <div className={s.container}>
      <ul className={s.list}>{tagsList}</ul>
    </div>
  );
};

export default TagsList;
