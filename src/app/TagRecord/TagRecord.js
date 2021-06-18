import { useSelector } from 'react-redux';
import { selectTagById } from '../../features/tags/tagsSlice';
import s from './TagRecord.module.scss';

const TagRecord = ({ id }) => {
  // const dispatch = useDispatch();
  const tag = useSelector((state) => selectTagById(state, id));

  // const handleDelete = () => {
  //   dispatch(deleteNote({ id }));
  // };

  // const handleEdit = () => {
  //   dispatch(updateNote({ id, isEditMode: true }));
  // };

  // const handleFocus = () => {
  //   dispatch(updateNote({ id, isViewMode: true }));
  // };

  // const handleBlur = () => {
  //   dispatch(updateNote({ id, isViewMode: false }));
  // };

  // const getFocus = () => {
  //   ref.current.focus();
  // }

  return (
    <div className={s.container}>
      {tag.content}

      {/* <button
        onClick={handleDelete}
      >Delete</button>

      <button
        onClick={handleEdit}
      >Edit</button> */}
    </div>
  );
};

export default TagRecord;
