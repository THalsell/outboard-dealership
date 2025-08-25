"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  AuthenticationData,
  LoginCredentials,
  RegistrationData,
  LoyaltyTier,
} from "@/types/models";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "LOGIN_SUCCESS"; payload: AuthenticationData }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: User };

interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Add this check to ensure we're on the client side
        if (typeof window === "undefined") {
          dispatch({ type: "SET_LOADING", payload: false });
          return;
        }

        const token = localStorage.getItem("auth_token");
        const userData = localStorage.getItem("user_data");

        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user,
              token,
              refreshToken: "",
              expiresAt: new Date(),
            },
          });
        } else {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      // Simulate API call - replace with actual API
      const response = await simulateLogin(credentials);

      // Store auth data
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user_data", JSON.stringify(response.user));

      if (credentials.rememberMe) {
        localStorage.setItem("remember_user", "true");
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: response });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Login failed",
      });
    }
  };

  const register = async (data: RegistrationData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      // Simulate API call - replace with actual API
      const response = await simulateRegister(data);

      // Store auth data
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user_data", JSON.stringify(response.user));

      dispatch({ type: "LOGIN_SUCCESS", payload: response });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Registration failed",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("remember_user");
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!state.user) throw new Error("No user logged in");

      // Simulate API call - replace with actual API
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem("user_data", JSON.stringify(updatedUser));

      dispatch({ type: "UPDATE_USER", payload: updatedUser });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Update failed",
      });
    }
  };

  const resetPassword = async (email: string) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      // Simulate API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Reset failed",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const verifyEmail = async () => {
    try {
      // Simulate API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (state.user) {
        const updatedUser = { ...state.user, emailVerified: true };
        localStorage.setItem("user_data", JSON.stringify(updatedUser));
        dispatch({ type: "UPDATE_USER", payload: updatedUser });
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Verification failed",
      });
    }
  };

  const contextValue: AuthContextType = {
    state,
    login,
    register,
    logout,
    updateUser,
    resetPassword,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Simulate API calls - replace with actual API integration
async function simulateLogin(
  credentials: LoginCredentials
): Promise<AuthenticationData> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    credentials.email === "demo@claypowersports.com" &&
    credentials.password === "demo123"
  ) {
    return {
      user: {
        id: "1",
        email: credentials.email,
        firstName: "John",
        lastName: "Doe",
        role: "CUSTOMER" as User["role"],
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          id: "1",
          userId: "1",
          loyaltyPoints: 1250,
          tier: "SILVER" as LoyaltyTier,
        },
      },
      token: "mock_jwt_token_" + Date.now(),
      refreshToken: "mock_refresh_token",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };
  }

  throw new Error("Invalid credentials");
}

async function simulateRegister(
  data: RegistrationData
): Promise<AuthenticationData> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    user: {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: "CUSTOMER" as User["role"],
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        id: Date.now().toString(),
        userId: Date.now().toString(),
        loyaltyPoints: 0,
        tier: "BRONZE" as LoyaltyTier,
      },
    },
    token: "mock_jwt_token_" + Date.now(),
    refreshToken: "mock_refresh_token",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };
}
