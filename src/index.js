import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loggedInStatus } from './consts/LoggedInConsts';

const defaultStatus = {
  isLoggedIn: false,
};

const reducer = (status = defaultStatus, action = loggedInStatus('notLoggedIn')) => {
  switch (action.type) {
    case 'setLoggedIn':
      return { ...status, isLoggedIn: true };
    case 'unSetLoggedIn':
      return { ...status, isLoggedIn: false };
    default:
      return status;
  }
};
const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
