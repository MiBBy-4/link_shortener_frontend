import axios from 'axios';

export function sessionRequest() {
  return axios.get(`${process.env.REACT_APP_API_URL}users/logged_in`, { withCredentials: true });
}

export function logoutRequest() {
  return axios.delete(`${process.env.REACT_APP_API_URL}users/logout`, { withCredentials: true });
}
