import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useGlobalContext } from 'context/Context';
import ProtectedRoute from 'utils/ProtectedRoute';
import AddButton from 'components/AddButton';
import SinglePage from 'pages/SinglePage';
import AuthRoute from 'utils/AuthRoute';
import DashBoard from 'pages/DashBoard';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import AddStory from 'pages/AddStory';
import Register from 'pages/Register';
import Alert from 'components/Alert';
import Account from 'pages/Account';
import Stories from 'pages/Stories';
import Update from 'pages/Update';
import About from 'pages/About';
import Error from 'pages/Error';
import Login from 'pages/Login';
import Home from 'pages/Home';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const { user, alert } = useGlobalContext();

  return (
    <Router>
      <NavBar />
      <ToastContainer />
      {alert.show && <Alert {...alert} />}
      {user && <AddButton />}
      <main>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <AuthRoute path='/login' component={Login} />
            <AuthRoute path='/register' component={Register} />
            <Route exact path='/stories' component={Stories} />
            <ProtectedRoute path='/account' component={Account} />
            <Route path='/stories/update/:slug' component={Update} />
            <ProtectedRoute path='/dashboard' component={DashBoard} />
            <ProtectedRoute path='/stories/create' component={AddStory} />
            <Route path='/stories/details/:slug' component={SinglePage} />
            <Route path='*' component={Error} />
          </Switch>
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
