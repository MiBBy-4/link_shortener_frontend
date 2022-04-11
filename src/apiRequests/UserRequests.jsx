import axios from 'axios';

export function sessionRequest() {
  return axios.get(`${process.env.REACT_APP_API_URL}users/logged_in`, { withCredentials: true });
}

export function logoutRequest() {
  return axios.delete(`${process.env.REACT_APP_API_URL}users/logout`, { withCredentials: true });
}

export function loginRequest(email, password) {
  return axios.post(`${process.env.REACT_APP_API_URL}users/sessions`, {
    user: {
      email: email,
      password: password,
    },
  }, { withCredentials: true });
}

export function registrationRequest(email, password, password_confirmation) {
  return axios.post(`${process.env.REACT_APP_API_URL}users/registrations`, {
    user: {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    },
  }, { withCredentials: true });
}
