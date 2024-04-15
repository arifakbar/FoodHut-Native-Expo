import axios from "axios";

const REACT_APP_API = process.env.EXPO_PUBLIC_APP_API;

export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    REACT_APP_API + "/create-or-update-user",
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post(
    REACT_APP_API + "/current-user",
    {},
    {
      headers: { authToken: authToken },
    }
  );
};

export const currentAdmin = async (authToken) => {
  return await axios.post(
    REACT_APP_API + "/current-admin",
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const updateUsername = async (username, authToken) => {
  return await axios.post(
    REACT_APP_API + "/update-username",
    {
      username: username,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const updateAddress = async (address, authToken) => {
  return await axios.post(
    REACT_APP_API + "/update-address",
    {
      address: address,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const applyDiscountCoupon = async (authToken, coupon) => {
  return await axios.post(
    REACT_APP_API + "/user/cart/coupon",
    {
      coupon: coupon,
    },
    { headers: { authToken: authToken } }
  );
};
