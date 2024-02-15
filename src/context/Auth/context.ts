import { getItem } from "@/utils/persistentStorage";
import { Auth, ContextType } from "./types";
import { Context, createContext, createRef } from "react";

export const initialState: Auth = {
  isLoggedIn: Boolean(getItem("token")),
  token: getItem("token"),
  rToken: getItem("rToken"),
  profile: {
    name: "",
  },
};

export const AuthContext: Context<ContextType> = createContext({
  auth: initialState,
});

export const AuthContextRef = createRef<ContextType>();
