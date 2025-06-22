import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const PostComment = ({ post, commentposted }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const postComment = (post, content) => {
    api
      .post(`posts/${post}/comments/`, { content })
      .then((res) => {
        setCommentContent("");
        commentposted?.()
      })
      .catch((err) => {
        if (err.response) {
          console.error("Error response:", err.response.data);
        } else {
          console.error("Error:", err.message);
        }
      });
  };

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
  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    postComment(post.id, commentContent);
  };

  return (
    <div className="relative w-[95%] lg:w-[50%] h-auto custom-gradient border-2 border-blue-200 flex flex-col justify-center items-center">
      <div className="w-full h-auto relative flex flex-row justify-between items-center mx-6 my-2 p-3">
        <div className="m-2 relative w-[10%] h-[4rem] top-0 left-0">
          <Link to={`/profile/${currentUser.id}`}>
            <img
              src={currentUser.avatar}
              alt=""
              className="rounded-full w-[4rem] h-[4rem]"
            />
          </Link>
        </div>
        <form
          className="w-full p-2 h-auto flex flex-col justify-center items-end"
          onSubmit={handleCommentSubmit}
        >
          <textarea
            name="commentContent"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="bg-blue-500 text-yellow-100 w-full rounded-md h-[4.5rem] border border-blue-50 focus:outline-none "
          ></textarea>
          <button
            type="submit"
            className="bg-red-100 px-4 m-2 mt-3 cursor-pointer py-1 rounded-md text-white hover:ring-1 hover:ring-blue-50"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
export default PostComment;
