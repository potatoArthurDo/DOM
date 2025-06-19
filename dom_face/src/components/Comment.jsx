import React from "react";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  return (
    <div className="relative w-[95%] lg:w-[50%] h-auto custom-gradient border-2 border-blue-100 flex flex-col justify-center items-center">
      <div className="w-full h-auto relative flex flex-row justify-between items-center mx-6 my-2 p-3">
        <div className="m-2 relative w-[10%] h-[4rem] absolute top-0 left-0">
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
          <div className="text-white w-full h-auto"><p className="m-1">{comment.content}</p></div>
        </div>
        {/* <h1 className="text-white">{comment.content}</h1> */}
      </div>
    </div>
  );
};
export default Comment;
