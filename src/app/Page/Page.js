import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import s from './Page.module.scss';

const Page = () => {
  return (
    <div className={s.page}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Page;
