import React from "react";

const Post = ({ currentUser, createPost }) => {
  return (
    <form
      className="custom-gradient w-[95%] lg:w-[50%] h-[6rem] rounded-sm flex flex-row justify-between items-center p-3 border-2 border-blue-50"
      onSubmit={createPost}
    >
      <a href="#" className="w-[10%] ml-4">
        <img
          src={currentUser.avatar}
          alt="avatar"
          className="rounded-full w-[5rem] h-[5rem] "
        />
      </a>
      <textarea
        className="bg-white w-[70%] h-[80%] rounded-md focus:outline-none"
        placeholder="'sup?"
        name="content"
      ></textarea>
      <button
        type="submit"
        value="submit"
        className="bg-red-100 mr-4 w-[4rem] h-[2rem] rounded-md hover:ring-1 hover:ring-blue-50  text-white cursor-pointer"
      >
        Post
      </button>
    </form>
  );
};
export default Post;
