import NoteEditor from '../NoteEditor/NoteEditor';
import s from './Note.module.scss';

const Note = () => {
  return (
    <div className={s.container}>
      <NoteEditor />
    </div>
  );
};

export default Note;
