const LOGGED_IN_STATUS = {
  loggedIn: 'setLoggedIn',
  notLoggedIn: 'unSetLoggedIn',
};

export const loggedInStatus = (name) => {
  return LOGGED_IN_STATUS[name];
};
