import NoteCreator from '../NoteCreator/NoteCreator';
import NotesList from '../NotesList/NotesList';
import s from './NotesSection.module.scss';

const NotesSection = () => {
  return (
    <section className={s.container}>
      <NoteCreator />
      <NotesList />
    </section>
  );
};

export default NotesSection;
