import { createContext, useEffect, useReducer } from "react";
import { action } from "../pages/Home";

export const GlobalContext = createContext();

const dataFromLocalStroge = () => {
  return JSON.parse(
    localStorage.getItem("images") || {
      likedImages: [],
      downloadedImages: [],
    },
  );
};

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "AUTH_READY":
      return { ...state, auth_ready: true };
    case "LOGIN":
      return { ...state, user: payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "LIKE":
      return { ...state, likedImages: [...state.likedImages, payload] };
    case "UNLIKE":
      return {
        ...state,
        likedImages: state.likedImages.filter((image) => {
          return image.id !== payload;
        }),
      };
    case "DOWNLOAD":
      return {
        ...state,
        downloadedImages: [...state.downloadedImages, payload],
      };

    case "NOTDOWNLOAD":
      return {
        ...state,
        downloadedImages: state.downloadedImages.filter((image) => {
          return image.id !== payload;
        }),
      };
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: null,
    auth_ready: false,
    likedImages: [],
    downloadedImages: [],
  });

  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(state));
  }, [state]);
  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
