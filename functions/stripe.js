import axios from "axios";

const REACT_APP_API = process.env.EXPO_PUBLIC_APP_API;

export const createPaymentIntent = async (authToken, coupon) => {
  return await axios.post(
    REACT_APP_API + "/create-payment-intent",
    { couponApplied: coupon },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
