import React, { useState, useEffect } from "react";
import Dot from "./Dot";
import { Link } from "react-router-dom";
import api from "../api";

const Domed = ({ post, deletePost }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    console.log("Domed rendering");
    if (post?.liked_by_user !== undefined && post?.total_likes !== undefined) {
      setLiked(post.liked_by_user);
      setLikes(post.total_likes);
      

    }
  }, [post]);

  // 🔒 Prevent rendering before data is ready
  if (!post || !post.profile || !post.user) return null;

  const handleLike = () => {
    api
      .post(`posts/${post.id}/like/`)
      .then((res) => {
        setLiked(res.data.liked);
        setLikes(res.data.total_likes);
      })
      .catch((err) => console.log(err));
  };

  const handleComment = () => {
    window.open("/post/" + post.id, "_blank");
  };

  return (
    <div className="relative w-[50%] lg:w-[50%] h-auto custom-gradient border-2 border-blue-50 flex flex-col justify-center items-center">
      <div className="w-full h-auto relative flex flex-row justify-between items-center mx-6 my-2">
        <div className="absolute left-0 top-0 w-[10%] h-[7rem] ml-7 m-2">
          <Link to={`/profile/${post.user.id}`}>
            <img
              src={post.profile.avatar}
              alt=""
              className="rounded-full w-[4rem] h-[4rem]"
            />
          </Link>
          <h6 className="text-center text-white text-xl font-bold">
            {post.profile.username}
          </h6>
        </div>
        <div className="ml-[17%] bg-blue-500 text-white w-[75%] h-auto p-4 rounded-sm mt-[10%]">
          {post.body}
          <img src={post.image} alt="" className="w-full h-auto mt-2" />
        </div>
        {deletePost && (
          <button
            onClick={() => deletePost(post.id)}
            className="mx-5 cursor-pointer"
          >
            <img src="/assets/images/delete.png" alt="" />
          </button>
        )}
      </div>
      <div className="w-full relative flex flex-row justify-start space-x-2 items-center my-2 ml-[20%]">
        <Dot action="like" amount={likes} onClick={handleLike} liked={liked} />
        <Dot
          action="comment"
          amount={post.total_comments}
          onClick={handleComment}
        />
        <Dot action="share" amount="0" />
      </div>
    </div>
  );
};

export default Domed;
