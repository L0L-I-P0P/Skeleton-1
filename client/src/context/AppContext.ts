import { createContext } from 'react';
import { initState } from '../featrus/reducer';
import type State from '../types/State';
import type Action from '../types/Action';

type Context = {
  state: State;
  dispath: React.Dispatch<Action>;
};
const initContext: Context = {
  state: initState,
  dispath: () => {},
};

const AppContext = createContext<Context>(initContext);

export default AppContext;
