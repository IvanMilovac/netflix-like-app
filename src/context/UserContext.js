import { createContext } from "react";

export const UserContext = createContext({
  token: null,
  name: "",
  login: () => {},
  logout: () => {},
});
