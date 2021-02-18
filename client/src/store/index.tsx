import { createContext, FunctionComponent, Reducer, useReducer } from "react";

interface State {
  currency: string;
}

interface Action {
  type: string;
}

interface Payload<T> extends Action {
  payload: T;
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
