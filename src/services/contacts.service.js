import axios from "axios";
import { api } from "../constants/routes";

export const getContacts = async () => {
  const url = api + "/contacts";

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addContact = async (data) => {
  const url = api + "/contacts";

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteContact = async (id) => {
  const url = api + "/contacts/" + id;

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = async (id, data) => {
  const url = api + "/contacts/" + id;

  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateFavourite = async (id, data) => {
  const url = api + "/favourites/" + id;

  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
