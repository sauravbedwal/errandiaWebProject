import axios from "axios";
import { BASE_URL } from "../Constant";
// import { useSelector } from "react-redux";

import appStore from "../utils/appStore";

// const token = sessionStorage.getItem("access_token");

export const isTokenValid = () => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Check if token is expired
  } catch (error) {
    return false; // Invalid token
  }
};

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       sessionStorage.clear();
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export const getApi = async (url, token) => {
  const response = await axios.get(
    BASE_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      withCredentials: true,
    }
  );
  return response;
};

export const postApi = async (url, data, token, formData = false) => {
  const language = appStore.getState()?.language?.language || "en";
  // console.log("languagePOstApi", language);
  const response = await axios.post(BASE_URL + url, data, {
    headers: {
      "Accept-Language": language,
      Authorization: `Bearer ${token}`,
      "Content-Type": formData ? "multipart/form-data" : "application/json",
    },
  });
  return response;
};

export const putApi = async (url, data, token) => {
  const response = await axios.put(
    BASE_URL + url,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      withCredentials: true,
    }
  );
  return response;
};

export const patchApi = async (url, data, token) => {
  const response = await axios.patch(
    BASE_URL + url,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      withCredentials: true,
    }
  );
  return response;
};

export const deleteApi = async (url, token) => {
  const response = await axios.delete(
    BASE_URL + url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      withCredentials: true,
    }
  );
  return response;
};
