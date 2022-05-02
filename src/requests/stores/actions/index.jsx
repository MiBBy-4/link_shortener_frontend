export const setUser = (user) => {
  return {
    type: 'USER_SETTED',
    payload: user,
  };
};

export const unSetUser = () => {
  return {
    type: 'USER_UNSETTED',
  };
};
