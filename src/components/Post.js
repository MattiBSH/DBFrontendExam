import React, { useState, useEffect } from "react";
import ForumService from "../services/forum.service";
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
import "bootstrap/dist/css/bootstrap.min.css";

const Post = ({ post }) => {
  const [commenting, setCommenting] = useState(false);
  const [comments, setComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [formValue, setFormValue] = useState();

  const onInput = ({target:{value}}) => setFormValue(value);


  const toggleCommenting = () => {
    setCommenting(!commenting);
    console.log(commenting.toString());
  };

  const toggleComments = () => {
    setComments(!comments);
    console.log(comments.toString());
  };

  const likePost = async (e) => {
    e.preventDefault();
    await ForumService.likePost(post);
    post.likes++;
    setLiked(true);
  };

  const commentPost = async (e) => {
    e.preventDefault();
    await ForumService.commentPost(post.id_String, formValue);
    setCommenting(false);
  };

  return (
    <Card>
      <Card.Header>Posted by {post.author}</Card.Header>
      <Card border="light">
        <Card.Text>{post.content}</Card.Text>
      </Card>
      <Row>
        <Col sm={4}>
          <Breadcrumb>
            {!liked && (
              <Breadcrumb.Item onClick={likePost}>Like</Breadcrumb.Item>
            )}
            {liked && <Breadcrumb.Item active>Like</Breadcrumb.Item>}
            <Breadcrumb.Item onClick={toggleCommenting}>
              Comment
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{post.likes} like(s)</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Button onClick={toggleComments} variant="outline-secondary">
        Comments
      </Button>
      {commenting && (
        <>
          <br></br>
          <Form onSubmit={commentPost}>
            <Form.Group controlId="formCommentText">
              <Form.Control type="text" placeholder="..." onChange={onInput} value={formValue}></Form.Control>
              <Form.Text>Commenting on {post.author}'s post...</Form.Text>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </>
      )}
      {comments && (
        <>
          <br></br>
          <Card.Title>
            Comments
            {post.comments.map((c) => {
              return (
                <>
                  <Card border="primary">
                    <Card.Text>{c}</Card.Text>
                  </Card>
                </>
              );
            })}
          </Card.Title>
        </>
      )}
    </Card>
  );
};

export default Post;
