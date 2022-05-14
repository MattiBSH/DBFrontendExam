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
const getAllArrangements = () => {
  return axios.get(API_URL_USER + "allArrangements", { headers: authHeader() });
};
const deleteArrangements = (id) => {
  return axios.delete(API_URL_USER + "arrangement/delete/", { headers: authHeader(),params: { id:id }});
};

const arrangementPost = (name, type, userIds) => {
  return axios.post(API_URL_USER + "arrangement",{id:Math.floor(Math.random() * 100000000000000),name, type, userIds},{
    headers: authHeader()},
    
  );
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUsers,
  deleteUser,
  getAllArrangements,
  deleteArrangements,
  arrangementPost
  
};
export default UserService;