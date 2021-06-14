import NotesSection from '../NotesSection/NotesSection';
import TagsSection from '../TagsSection/TagsSection';
import s from './Main.module.scss';

const Main = () => {
  return (
    <main className={s.main}>
      <TagsSection />
      <NotesSection />
    </main>
  );
};

export default Main;
