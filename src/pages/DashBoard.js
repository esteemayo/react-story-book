import axios from 'axios';
import { useState, useEffect } from 'react';

import Table from 'components/Table';
import Loader from 'components/Loader';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_API_URL, REACT_APP_PROD_API_URL } = process.env;

const DashBoard = () => {
  const { user } = useGlobalAuthContext();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { path: 'title', label: 'Title' },
    { path: 'createdAt', label: 'Date' },
    { path: 'status', label: 'Status' },
  ];

  useEffect(() => {
    (async () => {
      try {
        const { data, status, statusText } = await axios.get(
          `${devEnv ? REACT_APP_DEV_API_URL : REACT_APP_PROD_API_URL
          }/users/dashboard`
        );
        if (status >= 200 && status < 299) {
          setLoading(false);
          setStories(data);
        } else {
          throw new Error(statusText);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  if (stories.length === 0) {
    return <p>You have not created any stories yet</p>;
  }

  return (
    <div className='container'>
      <h1>Welcome {user?.firstName}</h1>
      <h4>Your Stories</h4>
      <Table data={stories} columns={columns} />
    </div>
  );
};

export default DashBoard;
