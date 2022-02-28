import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {
  About,
  Account,
  AddStory,
  DashBoard,
  Error,
  Home,
  Login,
  Register,
  SinglePage,
  Stories,
  Update,
} from 'pages';
import { AddButton, Alert, Footer, NavBar } from 'components';
import { useGlobalContext } from 'context/Context';
import ProtectedRoute from 'utils/ProtectedRoute';
import AuthRoute from 'utils/AuthRoute';

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
            <ProtectedRoute path='/dashboard' component={DashBoard} />
            <ProtectedRoute path='/stories/create' component={AddStory} />
            <Route path='/stories/details/:slug' component={SinglePage} />
            <ProtectedRoute path='/stories/update/:slug' component={Update} />
            <Route path='*' component={Error} />
          </Switch>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
