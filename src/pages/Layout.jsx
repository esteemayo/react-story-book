import { Outlet } from 'react-router-dom';

import Alert from 'components/Alert';
import AddButton from 'components/button/AddButton';
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';
import NavBar from 'components/NavBar';

import { useGlobalContext } from 'context/story/StoryContext';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

import ToastProvider from 'providers/ToastProvider';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const Layout = () => {
  const { alert } = useGlobalContext();
  const { user } = useGlobalAuthContext();

  return (
    <main>
      <div>
        <NavBar />
        <ToastProvider />
        {alert.show && <Alert {...alert} />}
        <ScrollToTop />
        {user && <AddButton />}
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
