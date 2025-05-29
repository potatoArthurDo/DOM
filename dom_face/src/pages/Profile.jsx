import React from "react";
import Menu from "../components/Menu";
import Post from "../components/Post";
import Domed from "../components/Domed";
import { useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import ProfileDetailCard from "../components/ProfileDetailCard";

const Profile = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  
 
  useEffect(() => {
    getPosts();
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    api
      .get("current_user/")
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createPost = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    api
      .post("/posts/", { body: content })
      .then((res) => {
        setPosts([res.data, ...posts]);

        e.target.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPosts = () => {
    api
      .get(`profile/${id}/posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  return (
    <>
      <div className="custom-dark-gradient relative min-h-screen w-screen overflow-x-hidden flex flex-row items-center justify-center ">
        <Menu />
        <div className=" w-[75vw] lg:w-[85vw]">
          <div className="custom-dark-gradient  min-h-[100vh] p-4 flex flex-col items-center justify-start ml-2">
            <h1 className="text-white">Profile</h1>
            <ProfileDetailCard profile_id = {id} />
            {/* <Post currentUser={currentUser} createPost={createPost} /> */}
            {posts.map((post) => (
              <Domed
                post={post}
                like={post.total_likes}
                comment="50"
                share="2"
                key={post.id}
                deletePost={deletePost}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
