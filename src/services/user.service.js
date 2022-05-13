import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/test/";
const API_URL_USER = "http://localhost:8080/api/user/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const getAllUsers = () => {
  return axios.get(API_URL_USER + "all", { headers: authHeader() });
};
const deleteUser = (email) => {
  return axios.delete(API_URL_USER + "delete/", { headers: authHeader(),params: { email:email }});
};
const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUsers,
  deleteUser
};
export default UserService;