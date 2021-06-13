import Header from '../Header/Header';
import AppMain from '../AppMain/AppMain';
import Footer from '../Footer/Footer';
import s from './App.module.scss';

const App = () => {
  return (
    <div className={s.app}>
      <Header />
      <AppMain />
      <Footer />
    </div>
  );
};

export default App;
