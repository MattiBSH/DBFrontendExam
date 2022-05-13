import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const[users,setUsers]=useState([])


  function deleteUser(email) {
    UserService.deleteUser(email);
    UserService.getAllUsers().then(
      (response) => {
        setUsers(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );

  }

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
    UserService.getAllUsers().then(
      (response) => {
        setUsers(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, [users]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        
      </header>
      <table className="table">
        <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                    </tr>
                </thead>
        {users!=null&&users.length!=null?users.map((user)=> {return <tr>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <button onClick={()=>deleteUser(user.email)} className="btn-danger btn-block btn-sm">Delete</button>
                </tr>}):""}
        </table>
    </div>
  );
};
export default BoardAdmin;
