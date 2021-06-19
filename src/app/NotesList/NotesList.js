import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNote, selectFilteredNotesIds } from '../../features/notes/notesSlice';
import NoteRecord from '../NoteRecord/NoteRecord';
import TagRecord from '../TagRecord/TagRecord';
import s from './NotesList.module.scss';

const NotesList = () => {
  const dispatch = useDispatch();
  const { notes, tags } = useSelector(selectFilteredNotesIds);

  const handleClick = (_, id) => {
    dispatch(setCurrentNote({ id }));
  };

  let notesList = 'No notes yet';
  let filterList = 'No filters yet';

  if (tags.length !== 0) {
    filterList = tags.map((id) => (
      <li key={id}>
        <TagRecord id={id} />
      </li>
    ));
  }

  if (notes.length !== 0) {
    notesList = notes.map((id) => (
      <li key={id} onClick={(e) => handleClick(e, id)}>
        <NoteRecord id={id} />
      </li>
    ));
  }

  return (
    <div className={s.container}>
      <ul className={s.filters}>{filterList}</ul>
      <ul>{notesList}</ul>
    </div>
  );
};

export default NotesList;
