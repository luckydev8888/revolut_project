import { ReactNode, createContext, useContext, useState } from "react";

export const LoadingContext = createContext<{
  wholeLoading: boolean;
  setWholeLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
}>({
  wholeLoading: false,
  setWholeLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [wholeLoading, setWholeLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ wholeLoading, setWholeLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
