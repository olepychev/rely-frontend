import axios from "axios";
import { useEffect } from "react";
import authHeader from "./auth.header";


// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "https://seashell-app-jatrt.ondigitalocean.app/api/auth/";

const register = (firstname, lastname, email, dni, birthdate, address, phone, password) => {
  return axios.post(API_URL + "signup", {
    firstname,
    lastname,
    email,
    dni,
    birthdate,
    address,
    phone,
    password,
    roles: ["user"],
    });
};


const getUserById = (id) => {
  return axios.get(API_URL + "user/" + id);
}


const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUserById,
};
export default AuthService;