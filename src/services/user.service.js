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

const arrangementPost = (name, type, teamIds,winner,second,third) => {
  return axios.post(API_URL_USER + "arrangement",{id: Math.floor(Math.random() * 100000000000000), name, type, teamIds,winner,second,third},{
    headers: authHeader()},
    
  );
};

const getStatsTeam1 = () => {
  return axios.get(API_URL_USER + "mostWins/Team", { headers: authHeader() });
};
const getStatsTeam2 = () => {
  return axios.get(API_URL_USER + "mostSecond/Team", { headers: authHeader() });
};
const getStatsTeam3 = () => {
  return axios.get(API_URL_USER + "mostThird/Team", { headers: authHeader() });
};
const getStatsUser1 = () => {
  return axios.get(API_URL_USER + "mostWins/person", { headers: authHeader() });
};
const getStatsUser2 = () => {
  return axios.get(API_URL_USER + "mostSecond/person", { headers: authHeader() });
};
const getStatsUser3 = () => {
  return axios.get(API_URL_USER + "mostThird/person", { headers: authHeader() });
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
  arrangementPost,
  getStatsTeam1,getStatsTeam2,getStatsTeam3,getStatsUser1,getStatsUser2,getStatsUser3
  
};
export default UserService;