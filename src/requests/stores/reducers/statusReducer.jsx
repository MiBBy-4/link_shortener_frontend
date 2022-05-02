import { loggedInStatus } from '../../../components/consts/LoggedInConsts';

const defaultStatus = {
  isLoggedIn: false,
};

export const statusReducer = (status = defaultStatus, action = loggedInStatus('notLoggedIn')) => {
  switch (action.type) {
    case 'setLoggedIn':
      return { ...status, isLoggedIn: true };
    case 'unSetLoggedIn':
      return { ...status, isLoggedIn: false };
    default:
      return status;
  }
};
