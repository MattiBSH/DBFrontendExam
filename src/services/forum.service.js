import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/forum/";

const getAllPosts = () => {
  return axios.get(API_URL + "post/all", { headers: authHeader() });
};

const likePost = (post) => {
    return axios.post(API_URL + "post/like", {
      "id":post.id_String,
    }, { headers: authHeader() });
  };

const commentPost = (id, comment) => {
    return axios.post(API_URL + "post/comment", {
      "id":id,
      "content":comment,
    }, { headers: authHeader() });
  };

  const makePost = (post, user) => {
    return axios.post(API_URL + "post", {
      "author": user.username,
      "content": post,
      "comments": [],
      "likes": 0
    }, { headers: authHeader() });
  };

const ForumService = {
  getAllPosts,
  likePost,
  commentPost,
  makePost,
};

export default ForumService;