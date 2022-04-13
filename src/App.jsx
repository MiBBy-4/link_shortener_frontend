import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import Main from './link/Main';
import LinksList from './link/LinksList';
import LinkNavbar from './templates/Navbar';
import { sessionRequest } from './apiRequests/UserRequests';
import { loggedInStatus } from './consts/LoggedInConsts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './auth/Login';
import Registration from './auth/Registration';
import LinkShow from './link/LinkShow';

function App() {
  const [state, setState] = useState({
    user: {},
  });
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((status) => status.isLoggedIn);
  const navigate = useNavigate();

  async function checkLoginStatus() {
    const response = await sessionRequest();
    const { data: { user, logged_in } } = response;
    if (logged_in && !isLoggedIn) {
      dispatch({ type: loggedInStatus('loggedIn') });
      setState({
        user: user,
      });
    } else if (!logged_in && isLoggedIn) {
      dispatch({ type: loggedInStatus('notLoggedIn') });
      setState({
        user: {},
      });
    }
  }

  useEffect(() => {
    checkLoginStatus();
  });

  function handleLogin(data) {
    dispatch({ type: loggedInStatus('loggedIn') });
    setState({
      user: data.user,
    });
  }

  function handleLogout() {
    dispatch({ type: loggedInStatus('notLoggedIn') });
    setState({
      user: {},
    });
    navigate('/');
  }

  return (
    <div className="App">
      <LinkNavbar handleLogout={handleLogout} user={state.user} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/links" element={<LinksList />} />
        <Route
          path="/links/:linkId"
          element={<LinkShow user={state.user} />}
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
