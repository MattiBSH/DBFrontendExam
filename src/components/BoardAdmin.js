import React, { useState, useEffect,useRef } from "react";
import UserService from "../services/user.service";
const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const[users,setUsers]=useState([])
  const[arrangements,setArrangements]=useState([])
  const form = useRef();
  const checkBtn = useRef();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [userIds, setuserIds] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [winner, setWinner] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [winnerUser, setWinnerUser] = useState("");
  const [secondUser, setSecondUser] = useState("");
  const [thirdUser, setThirdUser] = useState("");
  const [winnerTeam, setWinnerTeam] = useState("");
  const [secondTeam, setSecondTeam] = useState("");
  const [thirdTeam, setThirdTeam] = useState("");
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  
  const onChangeType = (e) => {
    const type = e.target.value;
    setType(type);
  };
  
  const onChangeUserIds = (e) => {
    const userIds = e.target.value;
    setuserIds(userIds);
  };
  
  const onChangeWinner = (e) => {
    const winner = e.target.value;
    setWinner(winner);
  };

  const onChangeSecond = (e) => {
    const second = e.target.value;
    setSecond(second);
  };

  const onChangeThird = (e) => {
    const third = e.target.value;
    setThird(third);
  };

  const handlePost= async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    
    var ids=userIds.split(',').map(function(item) {
      return parseInt(item, 10);
  });
      UserService.arrangementPost(name, type, ids,winner,second,third).then(

        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
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
        });
    
  };

  async function deleteUser(type){
    await UserService.deleteUser(type);
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
    UserService.getStatsTeam1().then(
      (response) => {
        setWinnerTeam(response.data);
        console.log(winnerTeam);
      }
    );
    UserService.getStatsTeam2().then(
      (response) => {        

        setSecondTeam(response.data);
      }
    );
    UserService.getStatsTeam3().then(
      (response) => {        
        setThirdTeam(response.data);
      }
    );
    UserService.getStatsUser1().then(
      (response) => {        

        setWinnerUser(response.data);
      }
    );
    UserService.getStatsUser2().then(
      (response) => {
        setSecondUser(response.data);
      }
    );
    UserService.getStatsUser3().then(
      (response) => {
        setThirdUser(response.data);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>  
      </header>
      <h4>All users in system</h4>
      <table className="table">
        <thead>
                    <tr>
                    <th>ID</th>
                    <th>name</th>
                    <th>type</th>
                    <th>Actions</th>
                    </tr>
                </thead>
        {users!=null&&users.length!=null?users.map((user)=> {return <tr>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <button onClick={()=>deleteUser(user.type)} className="btn-danger btn-block btn-sm">Delete</button>
                </tr>}):""}                
        </table>
        <h4>All current Events</h4>
        <table className="table">
        <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Team IDs</th>
                    <th>First</th>
                    <th>Second</th>
                    <th>Third</th>
                    </tr>
                </thead>
        {arrangements.length!=null?arrangements.map((arrangements)=> {return <tr>
                    <td>{arrangements.id}</td>
                    <td>{arrangements.name}</td>
                    <td>{arrangements.type}</td>
                    <td>{arrangements.teamIds.toString()}</td>
                    <td>{arrangements.winner.toString()}</td>
                    <td>{arrangements.second.toString()}</td>
                    <td>{arrangements.third.toString()}</td>

                    <button onClick={()=>deleteArrangements(arrangements.id)} className="btn-danger btn-block btn-sm">Delete</button>
                </tr>}):""}
                
        </table>
        <div className="col-md-12">
      <div className="card card-container">
        <h4>Make Event</h4>
        <form onSubmit={handlePost}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  value={type}
                  onChange={onChangeType}
                />
              </div>
              <div className="form-group">
                <label htmlFor="userIds">User ids (comma seperated)</label>
                <input
                  type="userIds"
                  className="form-control"
                  name="userIds"
                  value={userIds}
                  onChange={onChangeUserIds}
                />
              </div>
              <div className="form-group">
                <label htmlFor="userIds">Winner ID</label>
                <input
                  type="winner"
                  className="form-control"
                  name="winner"
                  value={winner}
                  onChange={onChangeWinner}
                />
              </div>
              <div className="form-group">
                <label htmlFor="userIds">Second ID</label>
                <input
                  type="second"
                  className="form-control"
                  name="second"
                  value={second}
                  onChange={onChangeSecond}
                />
              </div>
              <div className="form-group">
                <label htmlFor="userIds">Third ID</label>
                <input
                  type="third"
                  className="form-control"
                  name="third"
                  value={third}
                  onChange={onChangeThird}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <button style={{ display: "none" }} ref={checkBtn} />
        </form>
      </div>
    </div>
    <h1 align="center">Stats</h1>
    {winnerUser==null && winner.length==0?<h3>Nothing to show</h3>:<h3>Most user wins{winnerUser[0]}</h3>}
    {secondUser==null && winner.length==0?<h3>Nothing to show</h3>:<h3>Most user second{secondUser[0]}</h3>}
    {thirdUser==null && winner.length==0?<h3>Nothing to show</h3>:<h3>Most user third{thirdUser[0]}</h3>}
    {winnerTeam==null && winner.length==0?<h3>Nothing to show</h3>:<h3>Most team wins{winnerTeam[0]}</h3>}
    {secondTeam==null && winner.length==0?<h3>Nothing to show</h3>:<h3>Most team second{secondTeam[0]}</h3>}
    {thirdTeam==null && winner.length==0?<h3>Nothing to show</h3>:<h3>Most team third{thirdTeam[0]}</h3>}
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

    </div>
  );
};
export default BoardAdmin;
