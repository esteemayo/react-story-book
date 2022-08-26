import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Alert from 'components/Alert';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import AddButton from 'components/AddButton';
import { useGlobalContext } from 'context/story/StoryContext';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

import 'react-toastify/dist/ReactToastify.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import ScrollToTop from 'components/ScrollToTop';

const Layout = () => {
  const { alert } = useGlobalContext();
  const { user } = useGlobalAuthContext();

  return (
    <main>
      <div>
        <NavBar />
        <ToastContainer />
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
