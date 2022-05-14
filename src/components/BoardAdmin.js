import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const[users,setUsers]=useState([])
  const[arrangements,setArrangements]=useState([])


  async function deleteUser(email){
    await UserService.deleteUser(email);
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

  async function deleteArrangements(id) {
    await UserService.deleteArrangements(id);
    UserService.getAllArrangements().then(
      (response) => {
        setArrangements(response.data);
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
    this.forceUpdate()

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
    UserService.getAllArrangements().then(
      (response) => {
        console.log(response.data)

        setArrangements(response.data);
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
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        
      </header>
      <table className="table">
        <thead>
                    <tr>
                    <th>ID</th>
                    <th>Username</th>
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
        <table className="table">
        <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>UserIds</th>
                    </tr>
                </thead>
        {arrangements.length!=null?arrangements.map((arrangements)=> {return <tr>
                    <td>{arrangements.id}</td>
                    <td>{arrangements.name}</td>
                    <td>{arrangements.type}</td>
                    <td>{arrangements.userIds.toString()}</td>
                    <button onClick={()=>deleteArrangements(arrangements.id)} className="btn-danger btn-block btn-sm">Delete</button>
                </tr>}):""}
                
        </table>
    </div>
  );
};
export default BoardAdmin;
