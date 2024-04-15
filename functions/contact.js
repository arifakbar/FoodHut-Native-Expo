import axios from "axios";

const REACT_APP_API = process.env.EXPO_PUBLIC_APP_API;

export const getContacts = async (authToken) => {
  return await axios.get(REACT_APP_API + "/contacts", {
    headers: { authToken: authToken },
  });
};

export const createContact = async (
  authToken,
  name,
  email,
  subject,
  message
) => {
  return await axios.post(
    REACT_APP_API + "/contact",
    {
      name,
      email,
      subject,
      message,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const deleteContact = async (authToken, contactId) => {
  return await axios.delete(REACT_APP_API + "/contact/" + contactId, {
    headers: {
      authToken: authToken,
    },
  });
};
