import type User from '../../../types/User';

type AuthState = {
  user: User | undefined;
};

export default AuthState;
