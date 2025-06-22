import React from "react";
import api from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import Comment from "../components/Comment";
import Domed from "../components/Domed";
import PostComment from "../components/PostComment";
const DomDetail = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const deletePost = (id) => {
    api
      .delete(`/posts/del/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Post deleted successfully");
        else alert("Failed to delete post");
        getPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPost = (id) => {
    api
      .get(`posts/${id}/`)
      .then((res) => {
        setPost(res.data);
        // console.log("Post fetched:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getComments = (id) => {
    api
      .get(`posts/${id}/comments/`)
      .then((res) => {
        setComments(res.data);
        // console.log("Here are comments");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      getPost(id);
      getComments(id);
    }
  }, [id]);

  return (
    <div className="custom-dark-gradient relative min-h-screen w-screen overflow-x-hidden flex flex-row items-center justify-center ">
      <Menu />
      <div className=" w-[75vw]  lg:w-[85vw]">
        <div className="custom-dark-gradient min-h-[100vh] p-4 flex flex-col items-center justify-start ml-2">
          <h1 className="text-white">Post</h1>
          {post ? (
            <Domed post={post} deletePost={deletePost} />
          ) : (
            <p className="text-white">Loading...</p>
          )}
          <PostComment post = {post} commentposted={() => getComments(id)} />

          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomDetail;
