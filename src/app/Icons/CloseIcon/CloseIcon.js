import clsx from 'clsx';
import s from './CloseIcon.module.scss';

const CloseIcon = ({ styleClass = null }) => {
  return (
    <div className={s.icon_container}>
      <span className={clsx(s.icon_line, styleClass)} />
      <span className={clsx(s.icon_line, styleClass)} />
    </div>
  );
}

export default CloseIcon;
