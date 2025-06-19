import { useState, useEffect } from "react";
import api from "../api";
import Domed from "../components/Domed";
import Menu from "../components/Menu";
import Post from "../components/Post";

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState([])

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
  }
  const getPosts = () => {
    api
      .get("posts/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createPost = (formData) => {
    api
      .post("/posts/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
      })
      .then((res) => {
        setPosts([res.data, ...posts]);
        e.target.reset();
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
    <div className="custom-dark-gradient relative min-h-screen w-screen overflow-x-hidden flex flex-row items-center justify-center ">
      <Menu />
      <div className=" w-[75vw]  lg:w-[85vw]">
        <div className="custom-dark-gradient min-h-[100vh] p-4 flex flex-col items-center justify-start ml-2">
            <h1 className="text-white">Home</h1>
          <Post currentUser = {currentUser}
          createPost={createPost} />
          {posts.map((post) => (
            <Domed
              post = {post}
              deletePost={deletePost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
