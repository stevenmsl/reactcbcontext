import React, { useState, useEffect } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
};

/* #TA01 */
const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email: string, password: string) => {},
});

export type AuthContextProviderProps = {
  children?: React.ReactNode;
};

const ITEM_IS_LOGGED_IN = "isLoggedIn";

/*#TA02*/
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem(ITEM_IS_LOGGED_IN);
    if (storedLoggedIn === "1") setIsLoggedIn(true);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem(ITEM_IS_LOGGED_IN);
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem(ITEM_IS_LOGGED_IN, "1");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
