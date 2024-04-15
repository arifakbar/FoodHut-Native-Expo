import axios from "axios";

const REACT_APP_API = process.env.EXPO_PUBLIC_APP_API;

export const getNews = async () => {
  return await axios.get(REACT_APP_API + "/news");
};
