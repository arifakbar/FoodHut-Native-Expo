import axios from "axios";

const REACT_APP_API = process.env.EXPO_PUBLIC_APP_API;

export const getUserWishlist = async (authToken) => {
  return await axios.get(REACT_APP_API + "/user/wishlists", {
    headers: { authToken: authToken },
  });
};

export const addToUserWishlist = async (authToken, productId) => {
  return await axios.post(
    REACT_APP_API + "/user/wishlist",
    {
      productId: productId,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const removeFromUserWishlist = async (authToken, productId) => {
  return await axios.put(
    REACT_APP_API + "/user/wishlist/" + productId,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
