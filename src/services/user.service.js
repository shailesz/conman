import axios from "axios";
import { api } from "../constants/routes";

export const getUser = async () => {
  const url = api + "/user";

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
