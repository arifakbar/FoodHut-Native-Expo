import axios from "axios";

const REACT_APP_API = process.env.EXPO_PUBLIC_APP_API;

export const getAllReservations = async (authToken) => {
  return await axios.get(REACT_APP_API + "/reservations", {
    headers: {
      authToken: authToken,
    },
  });
};

export const getUserReservations = async (authToken, id) => {
  return await axios.get(REACT_APP_API + "/user/reservation/" + id, {
    headers: { authToken: authToken },
  });
};

export const bookReservation = async (authToken, reservationBody) => {
  return await axios.post(REACT_APP_API + "/reservation", reservationBody, {
    headers: { authToken: authToken },
  });
};

export const updateReservationStatus = async (
  authToken,
  reservationId,
  status
) => {
  return await axios.put(
    REACT_APP_API + "/reservation/" + reservationId,
    { status: status },
    { headers: { authToken: authToken } }
  );
};

export const deleteReservation = async (authToken, reservationId) => {
  return await axios.delete(REACT_APP_API + "/reservation/" + reservationId, {
    headers: { authToken: authToken },
  });
};
