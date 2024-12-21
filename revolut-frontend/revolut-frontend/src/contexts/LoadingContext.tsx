import { ReactNode, createContext, useReducer } from "react";
import { IHandlers } from "../utils/interfaces";

/* --------------------------------------------------------------- */

interface IState {
  loading: boolean;
}

interface IAction {
  type: string;
  payload: boolean;
}

/* --------------------------------------------------------------- */

const initialState: IState = {
  loading: false,
};

const handlers: IHandlers = {
  SET_IS_LOADING: (state: IState, action: IAction) => {
    return {
      ...state,
      loading: action.payload,
    };
  },
};

const reducer = (state: IState, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

/* --------------------------------------------------------------- */

//  Context
const LoadingContext = createContext({
  ...initialState,
  //  @ts-ignore
  setLoadingAct: (value: boolean) => Promise.resolve(), // eslint-disable-line
});

//  Provider
const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoadingAct = (loading: boolean) => {
    dispatch({
      type: "SET_IS_LOADING",
      payload: loading,
    });
  };

  return (
    <LoadingContext.Provider
      value={{
        ...state,
        setLoadingAct,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
