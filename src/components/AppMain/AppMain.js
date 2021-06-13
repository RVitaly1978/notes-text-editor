import NotesSection from '../NotesSection/NotesSection';
import TagsSection from '../TagsSection/TagsSection';
import s from './AppMain.module.scss';

const AppMain = () => {
  return (
    <main className={s.main}>
      <TagsSection />
      <NotesSection />
    </main>
  );
};

export default AppMain;
