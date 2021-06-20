import SaveNotes from '../SaveNotes/SaveNotes';
import LoadNotes from '../LoadNotes/LoadNotes';
import s from './Header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <h1 className={s.logo}>Notes Text Editor</h1>
      <SaveNotes />
      <LoadNotes />
    </header>
  );
}

export default Header;
