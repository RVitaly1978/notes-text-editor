import NoteCreator from '../NoteCreator/NoteCreator';
import s from './Note.module.scss';

const Note = () => {
  return (
    <div className={s.container}>
      <NoteCreator />
    </div>
  );
};

export default Note;
