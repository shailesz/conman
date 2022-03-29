import axios from "axios";

export const getUser = async () => {
  const url = "http://localhost:4000/user";

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
