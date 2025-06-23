import React from "react";
import { Link } from "react-router-dom";
import Dot from "./Dot";
import { useState, useEffect } from "react";
import api from "../api";

const Comment = ({ comment , onLikeToggle}) => {
  const [commentLikes, setCommentLikes] = useState(0);
  const [commentLiked, setCommentLiked] = useState(null);

  const handleCommentLike = () => {
    api
      .post(`posts/comments/${comment.id}/like/`)
      .then((res) => {
        setCommentLikes(res.data.likes_count);
        setCommentLiked(res.data.is_liked);
         if (onLikeToggle) onLikeToggle();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (comment?.likes_count !== undefined && comment?.is_liked !== undefined) {
      setCommentLikes(comment.likes_count || 0);
      setCommentLiked(comment.is_liked || false);
    }
  }, [comment]);

  return (
    <div className="relative w-[95%] lg:w-[50%] h-auto custom-gradient border-2 border-blue-100 flex flex-col justify-center items-center">
      <div className="w-full h-auto relative flex flex-row justify-between items-center mx-6 my-2 p-3">
        <div className="m-2 relative w-[10%] h-[4rem] top-0 left-0">
          <Link to={`/profile/${comment.profile_id}`}>
            <img
              src={comment.avatar}
              alt=""
              className="rounded-full w-[4rem] h-[4rem]"
            />
          </Link>
        </div>
        <div className="relative h-auto w-[85%] flex  flex-col ">
          <div className="text-white text-l font-bold">
            <Link to={`/profile/${comment.profile_id}`}>
              {comment.username}
            </Link>{" "}
          </div>
          <div className="text-white w-full h-auto">
            <p className="m-1">{comment.content}</p>
          </div>
        </div>
        {/* <h1 className="text-white">{comment.content}</h1> */}
      </div>
      <div className="w-full relative flex flex-row justify-start space-x-2 items-center my-2 ml-[20%]">
        <Dot
          action="like"
          amount={commentLikes}
          liked={commentLiked}
          onClick={handleCommentLike}
        />
        <Dot action="comment" />
      </div>
    </div>
  );
};
export default Comment;
