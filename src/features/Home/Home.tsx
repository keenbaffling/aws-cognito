import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectUser, signOut } from '../Auth/authSlice';

const Home: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    if (user) return;

    history.replace('/auth/signin');
  }, [history, user]);

  return (
    <div className="home">
      <h1>Home</h1>

      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>

      <div style={{ marginTop: '2em' }}>{user?.email}</div>
    </div>
  );
};

export default Home;
