import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNote, selectAllNotesIds } from '../../features/notes/notesSlice';
import NoteViewer from '../NoteViewer/NoteViewer';
import s from './NotesList.module.scss';

const NotesList = () => {
  const dispatch = useDispatch();
  const allNotesIds = useSelector(selectAllNotesIds);

  const handleClick = (_, id) => {
    dispatch(setCurrentNote({ id }));
  };

  let notesList = 'No notes yet';

  if (allNotesIds.length !== 0) {
    notesList = allNotesIds.map((id) => (
      <li key={id} onClick={(e) => handleClick(e, id)}>
        <NoteViewer id={id} />
      </li>
    ));
  }

  return (
    <div className={s.container}>
      <ul>{notesList}</ul>
    </div>
  );
};

export default NotesList;
