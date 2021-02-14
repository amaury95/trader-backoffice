import { createContext, FunctionComponent, Reducer, useReducer } from "react";
import { SessionQuery } from "types";

interface State {
  session?: SessionQuery;
  currency: string;
}

interface Action {
  type: string;
}

interface Payload<T> extends Action {
  payload: T;
}

const SET_SESSION = "SET_SESSION";

export function setSession(
  payload?: SessionQuery
): Payload<SessionQuery | undefined> {
  return {
    type: SET_SESSION,
    payload,
  };
}

const SET_CURRENCY = "SET_CURRENCY";

export function setCurrency(payload: string): Payload<string> {
  return {
    type: SET_CURRENCY,
    payload,
  };
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case SET_CURRENCY: {
      const { payload: currency } = action as Payload<string>;
      return { ...state, currency };
    }
    case SET_SESSION: {
      const { payload: session } = action as Payload<SessionQuery>;
      return { ...state, session };
    }
    default: {
      return state;
    }
  }
};

const initialState = { currency: "USD" };

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
