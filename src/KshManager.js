import { createContext } from "react";
import useKshManager from "./useKshManager";

export const KshManagerContext = createContext();

export const KshManagerProvider = ({ children }) => {
  const ksh = useKshManager();
  return (
    <KshManagerContext.Provider value={ksh}>
      {children}
    </KshManagerContext.Provider>
  );
}