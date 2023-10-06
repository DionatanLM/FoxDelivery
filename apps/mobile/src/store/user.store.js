import React, { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/user.service";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const result = await userService.getUser();
      if (result) {
        setUserData(result);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <UserContext.Provider value={{ userData, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }

  return context;
}
