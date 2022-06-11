export const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SETTED':
      return { ...state, ...action.payload };
    case 'USER_UNSETTED':
      return {};
    default:
      return state;
  }
};
