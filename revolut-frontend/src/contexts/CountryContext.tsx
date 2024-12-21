import { createContext, ReactNode, useEffect, useReducer } from "react";
import axios from "axios";
import { IHandlers } from "../utils/interfaces";
import { API_TO_GET_IP } from "../utils/constants";
import { languages } from "../utils/data";

//  ----------------------------------------------------------------

interface IState {
  locale: string;
  code: string;
}

interface IAction {
  type: string;
  payload: string;
}

//  ----------------------------------------------------------------

const initialState: IState = {
  locale: "en",
  code: "US",
};

const handlers: IHandlers = {
  SET_LOCALE: (state: IState, action: IAction) => ({
    ...state,
    locale: action.payload,
  }),
  SET_CODE: (state: IState, action: IAction) => ({
    ...state,
    code: action.payload,
  }),
};

const reducer = (state: IState, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

let s = true;

//  ----------------------------------------------------------------

const CountryContext = createContext({
  ...initialState,
  setLocaleAct: Function,
});

const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (s) {
      axios
        .get(API_TO_GET_IP)
        .then((res) => {
          const { country_code, languages: resLanguages } = res.data;

          if (country_code) {
            dispatch({
              type: "SET_CODE",
              payload: country_code,
            });
          }

          if (resLanguages) {
            console.log(">>>>>>> languages => ", resLanguages);
            const language = resLanguages.split(",")[0].split('-')[0];
            console.log('>>>>>>> language => ', language);
            const locales = languages.map((l) => l.langCode);
            const _locale = locales.find((l) => l === language);

            dispatch({
              type: "SET_LOCALE",
              payload: _locale || locales[0],
            });
          }

          s = false;
        })
        .catch((err) => {
          console.log(">>>>>>> err => ", err);
        });
    }
  }, []);

  const setLocaleAct = (locale: string) => {
    dispatch({
      type: "SET_LOCALE",
      payload: locale,
    });
  };

  const setCodeAct = (code: string) => {
    dispatch({
      type: "SET_CODE",
      payload: code,
    });
  };

  return (
    <CountryContext.Provider value={{ ...state, setLocaleAct, setCodeAct }}>
      {children}
    </CountryContext.Provider>
  );
};

//  ----------------------------------------------------------------

export { CountryContext, CountryProvider };
