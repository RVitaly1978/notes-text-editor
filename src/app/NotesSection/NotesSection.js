import Note from '../Note/Note';
import NotesList from '../NotesList/NotesList';
import s from './NotesSection.module.scss';

const NotesSection = () => {
  return (
    <section className={s.notesSection}>
      <Note />
      <NotesList />
    </section>
  );
};

export default NotesSection;
