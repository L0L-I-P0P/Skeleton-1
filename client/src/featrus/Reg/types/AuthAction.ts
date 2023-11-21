import type User from '../../../types/User';

type AuthAction = {
  type: 'user/auth';
  payload: User;
};

export default AuthAction;
