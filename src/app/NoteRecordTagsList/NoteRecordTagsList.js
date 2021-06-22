import { useSelector } from 'react-redux';
import { selectNoteTagsIdsByNoteId } from '../../features/notes/notesSlice';
import { selectMultipleTagsContentByIds } from '../../features/tags/tagsSlice';
import s from './NoteRecordTagsList.module.scss';

const NoteRecordTagsList = ({ id }) => {
  const noteTagsIds = useSelector((s) => selectNoteTagsIdsByNoteId(s, id));
  const noteTags = useSelector((s) => selectMultipleTagsContentByIds(s, noteTagsIds));

  let tagsList;
  if (noteTags.length !== 0) {
    tagsList = noteTags.map((tag) => <li key={tag}>{tag}</li>);
  }

  return noteTags.length ? (<ul className={s.list}>{tagsList}</ul>) : null;
};

export default NoteRecordTagsList;
