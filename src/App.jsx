import { Outlet } from 'react-router-dom';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import Toast from './components/Toast/Toast';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
      <Toast />
    </>
  );
}

export default App;
