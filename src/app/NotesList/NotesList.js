import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNote, selectFilteredNotesIds } from '../../features/notes/notesSlice';
import NoteRecord from '../NoteRecord/NoteRecord';
import FilterList from '../FilterList/FilterList';
import s from './NotesList.module.scss';

const NotesList = () => {
  const dispatch = useDispatch();
  const { notes, tags } = useSelector(selectFilteredNotesIds);

  const handleClick = (_, id) => {
    dispatch(setCurrentNote({ id }));
  };

  let notesList = 'No notes';

  if (notes.length !== 0) {
    notesList = notes.map((id) => (
      <li key={id} onClick={(e) => handleClick(e, id)}>
        <NoteRecord id={id} />
      </li>
    ));
  }

  return (
    <div className={s.container}>
      <FilterList tags={tags} />
      <ul className={s.list}>
        {notesList}
      </ul>
    </div>
  );
};

export default NotesList;
