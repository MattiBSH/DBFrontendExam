import React, { useState, useEffect } from "react";
import ForumService from "../services/forum.service";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./Post";
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Text,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

const Forum = ({user}) => {
  const [posts, setPosts] = useState([]);
  const [posting, setPosting] = useState(false);
  const [formValue, setFormValue] = useState();
  const onInput = ({target:{value}}) => setFormValue(value);

  const togglePosting = () => {
    setPosting(!posting);
  }

  useEffect(() => {
    ForumService.getAllPosts().then(
      (response) => {
        if(response.status!=200){
          console.log(response.data)
          setPosts(response.data);
        }
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setPosts(_content);
      }
    );
  }, []);

  const submitPost = async (e) => {
    e.preventDefault();
    await ForumService.makePost(formValue, user);
    setPosting(false);
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Forum</h3>
      </header>
      <div className="d-grid gap-2">
      <Button variant="primary" size="lg" onClick={togglePosting}>Make a post</Button>
      </div>
      {posting && (
        <>
        <br></br>
        <Form onSubmit={submitPost}>
          <Form.Group>
          <Form.Control type="text" placeholder="..." onChange={onInput} value={formValue}></Form.Control>
          <br></br>
              <Button variant="primary" type="submit">
                Submit
              </Button>
          </Form.Group>
        </Form>
        </>
      )}
      <div>
          {posts.length!=0 ?? posts.map((post)=>{
              return <Post post={post}/>;},)},
      </div>
    </div>
  );
};

export default Forum;