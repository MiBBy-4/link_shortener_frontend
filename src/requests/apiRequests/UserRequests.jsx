import axios from 'axios';

export function sessionRequest() {
  return axios.get(`${process.env.REACT_APP_API_URL}users/logged_in`, { withCredentials: true });
}

export function logoutRequest() {
  return axios.delete(`${process.env.REACT_APP_API_URL}users/logout`, { withCredentials: true });
}

export async function loginRequest(email, password, handleSuccessfulAuth) {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}users/sessions`, {
    user: {
      email: email,
      password: password,
    },
  }, { withCredentials: true });
  const { data: { status } } = response;
  if (status === 201) {
    handleSuccessfulAuth(response.data);
  }
}

export async function registrationRequest(email, password, password_confirmation, handleSuccessfulAuth) {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}users/registrations`, {
    user: {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    },
  }, { withCredentials: true });

  const { data: { status } } = response;
  if (status === 201) {
    handleSuccessfulAuth(response.data);
  }
}
