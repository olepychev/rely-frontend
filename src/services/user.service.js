import axios from "axios";
import authHeader from "./auth.header";
const API_URL = "http://localhost:8080/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const getUserById = (id) => {
  return axios.get(API_URL + "user/" + id, { headers: authHeader() });
};

const updateUserById = (id, firstname, lastname, phone, dni, birthdate, address) => {
  return axios.patch(API_URL + "user/update/" + id, {
    firstname,
    lastname,
    phone,
    dni,
    birthdate,
    address,
  }, { headers: authHeader() }
  );
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  getUserById,
  updateUserById,
};
export default UserService;