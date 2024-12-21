import { ReactNode, createContext, useReducer } from "react";
import { ICard, IHandlers } from "../utils/interfaces";

//  ----------------------------------------------------------------

interface IState {
  card: ICard | null;
}

interface IAction {
  type: string;
  payload: ICard;
}

//  ----------------------------------------------------------------

const initialState: IState = {
  card: null,
};

const handlers: IHandlers = {
  SET_CARD: (state: IState, action: IAction) => ({
    ...state,
    card: action.payload,
  }),
};

const reducer = (state: IState, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  ----------------------------------------------------------------

const CardContext = createContext({
  ...initialState,
  //  @ts-ignore
  setCardAct: (value: ICard) => Promise.resolve(),
});

const CardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCardAct = (card: ICard) => {
    dispatch({
      type: "SET_CARD",
      payload: card,
    });
  };

  return (
    <CardContext.Provider value={{ ...state, setCardAct }}>
      {children}
    </CardContext.Provider>
  );
};

//  ----------------------------------------------------------------

export { CardContext, CardProvider };
