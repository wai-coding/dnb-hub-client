import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthWrapper = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();

  async function authenticateUser() {
    const tokenInStorage = localStorage.getItem("authToken");
    if (!tokenInStorage) {
      setCurrentUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
      return;
    }
    try {
      const { data } = await axios.get("http://localhost:5005/auth/verify", {
        headers: {
          authorization: `Bearer ${tokenInStorage}`,
        },
      });

      setCurrentUser(data.currentLoggedInUser);
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
      setCurrentUser(null);
      setIsLoggedIn(false);
      nav("/");
    } finally {
      setIsLoading(false);
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
    setIsLoggedIn(false);
    nav("/login");
  };

  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        isLoggedIn,
        authenticateUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
