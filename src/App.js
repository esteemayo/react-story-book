import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import {
  About,
  Account,
  AddStory,
  DashBoard,
  Error,
  Home,
  Layout,
  Login,
  Register,
  SharedLayout,
  SinglePage,
  Stories,
  Update,
} from 'pages';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route
            path='login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path='stories' element={<SharedLayout />}>
            <Route index element={<Stories />} />
            <Route path='search' element={<Stories />} />
            <Route
              path='create'
              element={
                <AuthRoute>
                  <AddStory />
                </AuthRoute>
              }
            />
            <Route path='details/:slug' element={<SinglePage />} />
            <Route
              path='update/:slug'
              element={
                <AuthRoute>
                  <Update />
                </AuthRoute>
              }
            />
          </Route>
          <Route
            path='account'
            element={
              <AuthRoute>
                <Account />
              </AuthRoute>
            }
          />
          <Route
            path='dashboard'
            element={
              <AuthRoute>
                <DashBoard />
              </AuthRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
