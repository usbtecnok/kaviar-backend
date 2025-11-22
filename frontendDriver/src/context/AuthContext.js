import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadStoredUser();
  }, []);

  async function loadStoredUser() {
    const stored = await AsyncStorage.getItem("driverToken");
    if (stored) setUser(JSON.parse(stored));
  }

  async function login(email, password) {
    try {
      const response = await api.post("/driver/login", { email, password });

      if (response.data?.token) {
        await AsyncStorage.setItem(
          "driverToken",
          JSON.stringify(response.data)
        );
        setUser(response.data);
      } else {
        throw new Error("Login inválido");
      }
    } catch (err) {
      throw new Error("Erro de login");
    }
  }

  async function logout() {
    await AsyncStorage.removeItem("driverToken");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
