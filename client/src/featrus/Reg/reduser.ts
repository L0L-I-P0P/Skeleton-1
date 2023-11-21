import type AuthAction from './types/AuthAction';
import type AuthState from './types/AuthState';

export const initState: AuthState = {
  user: undefined,
};

function reducer(state: AuthState = initState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'user/auth':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

export default reducer;
