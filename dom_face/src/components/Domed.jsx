import React from "react";
import Dot from "./Dot";

const Domed = ({ post, key, deletePost, like, comment, share }) => {
  return (
    <div className="relative w-[95%] lg:w-[50%]  h-auto custom-gradient border-2 border-blue-50 flex flex-col justify-center items-center">
      <div className="w-full h-auto relative flex flex-row justify-between items-center mx-6 my-2">
        <div className="absolute left-0 top-0  w-[10%] h-[7rem] ml-7 m-2 ">
          <a href="#">
            <img
              src={post.profile.avatar}
              alt=""
              className="rounded-full w-[5rem] h-[5rem]"
            />
          </a>
          <h6 className="text-center text-white-50 text-xl font-bold">
            {post.profile.username}
          </h6>
        </div>
        <div className=" ml-[17%] bg-blue-500 text-white w-[75%] h-auto p-4 rounded-sm mt-[10%]">
          {post.body}
        </div>
        <button onClick={() => deletePost(post.id)} className="mx-5 cursor-pointer">
            <img src="assets/images/delete.png" alt="" />
        </button>
      </div>
      <div className="w-full relative flex flex-row justify-start space-x-2 items-center my-2  ml-[20%]">
        <Dot action="like" amount={like} />
        <Dot action="comment" amount={comment} />
        <Dot action="share" amount={share} />
      </div>
    </div>
  );
};
export default Domed;
