import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import Main from './views/link/Main';
import LinksList from './views/link/LinksList';
import LinkNavbar from './components/templates/Navbar';
import { sessionRequest } from './requests/apiRequests/UserRequests';
import { loggedInStatus } from './components/consts/LoggedInConsts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/auth/Login';
import Registration from './views/auth/Registration';
import LinkShow from './views/link/LinkShow';
import { setUser, unSetUser } from './requests/stores/actions';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((status) => status.status.isLoggedIn);
  const navigate = useNavigate();

  async function checkLoginStatus() {
    const response = await sessionRequest();
    const { data: { user, logged_in } } = response;
    if (logged_in && !isLoggedIn) {
      dispatch({ type: loggedInStatus('loggedIn') }, user);
      dispatch(setUser(user));
    } else if (!logged_in && isLoggedIn) {
      dispatch({ type: loggedInStatus('notLoggedIn') });
      dispatch(unSetUser());
    }
  }

  useEffect(() => {
    checkLoginStatus();
  });

  function handleLogin(data) {
    dispatch({ type: loggedInStatus('loggedIn') });
    dispatch(setUser(data.user));
  }

  function handleLogout() {
    dispatch({ type: loggedInStatus('notLoggedIn') });
    dispatch(unSetUser());
    navigate('/');
  }

  return (
    <div className="App">
      <LinkNavbar handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/links" element={<LinksList />} />
        <Route
          path="/links/:linkId"
          element={<LinkShow />}
        />
      </Routes>
      { isLoggedIn ? (
        <Routes>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/registration" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/registration" element={<Registration handleLogin={handleLogin} />} />
        </Routes>
      ) }
    </div>
  );
}

export default App;
