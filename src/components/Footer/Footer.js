import { GithubLogo } from '../Icons';
import { footer as c } from '../../constants';
import s from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={s.footer}>

      <a className={s.footer_link} href={c.authorGitHubLink}>
        <GithubLogo styleClass={s.footer_icon__github} />
        &nbsp;{c.authorGitHubText}
      </a>

      <p>{c.year}</p>

    </footer>
  );
}

export default Footer;
