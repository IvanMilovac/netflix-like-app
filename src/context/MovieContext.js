import { createContext } from "react";

export const MovieContext = createContext({
  backdrop_path: "",
  poster_path: "",
  overview: "",
  title: "",
  original_title: "",
  id: 0,
});
