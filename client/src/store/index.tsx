import { createContext, FunctionComponent, Reducer, useReducer } from "react";
import { SessionQuery } from "types";

interface State {
  session?: SessionQuery;
}

interface Action {
  type: string;
}

interface SessionAction extends Action {
  payload?: SessionQuery;
}

const SET_SESSION = "SET_SESSION";

export function setSession(payload?: SessionQuery): SessionAction {
  return {
    type: SET_SESSION,
    payload,
  };
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case SET_SESSION: {
      const { payload: session } = action as SessionAction;
      return { ...state, session };
    }
    default: {
      return state;
    }
  }
};

const initialState = {};

interface StoreType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
export const Store = createContext({} as StoreType);

const StoreProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default StoreProvider;
