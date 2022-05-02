import axios from 'axios';

export async function sessionRequest(dispatchData) {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}users/logged_in`, { withCredentials: true });
  dispatchData(response);
}

export async function logoutRequest(handleLogout) {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}users/logout`, { withCredentials: true });

  if (response.data.logged_out) {
    handleLogout();
  }
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
