import SaveNotes from '../SaveNotes/SaveNotes';
import LoadNotes from '../LoadNotes/LoadNotes';
import { logoText } from '../../constants';
import s from './Header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <h1 className={s.logo}>{logoText}</h1>
      <div className={s.buttonsGroup}>
        <SaveNotes />
        <LoadNotes />
      </div>
    </header>
  );
}

export default Header;
