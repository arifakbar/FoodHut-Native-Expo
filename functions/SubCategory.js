import axios from "axios";

const REACT_APP_API = process.env.EXPO_PUBLIC_APP_API;

export const getAllSubCategories = async () => {
  return await axios.get(REACT_APP_API + "/sub-categories");
};

export const getSubByParent = async (id) => {
  return await axios.get(REACT_APP_API + `/sub-category-by-parent/${id}`);
};
