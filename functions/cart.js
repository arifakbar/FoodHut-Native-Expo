import axios from "axios";

const REACT_APP_API = process.env.EXPO_PUBLIC_APP_API;

export const addToUserCart = async (cart, authToken) => {
  return await axios.post(
    REACT_APP_API + "/user/cart",
    {
      cart: cart,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const getUserCart = async (authToken) => {
  return await axios.get(REACT_APP_API + "/user/cart", {
    headers: {
      authToken: authToken,
    },
  });
};

export const deleteUsercart = async (authToken) => {
  return await axios.delete(REACT_APP_API + "/user/cart", {
    headers: {
      authToken: authToken,
    },
  });
};
