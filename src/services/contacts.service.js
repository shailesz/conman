import axios from "axios";

export const getContacts = async () => {
  const url = "http://localhost:4000/contacts";

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
  const url = "http://localhost:4000/contacts";

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
  const url = `http://localhost:4000/contacts/${id}`;

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
  const url = `http://localhost:4000/contacts/${id}`;

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
  const url = `http://localhost:4000/favourites/${id}`;

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
