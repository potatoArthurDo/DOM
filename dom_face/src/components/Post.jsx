import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Post = ({ currentUser, createPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("body", content);
    if (image) {
      formData.append("image", image);
    }

    createPost(formData);
    setContent("");
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };
  return (
    <form
      className="custom-gradient w-[95%] lg:w-[50%] h-auto rounded-sm flex flex-col space-y-3 justify-start items-start p-3 border-2 border-blue-50"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full justify-between items-center">
        <Link to={`/profile/${currentUser.id}`} className="w-[10%] ml-4">
          <img
            src={currentUser.avatar}
            alt="avatar"
            className="rounded-full w-[5rem] h-[5rem] object-cover"
          />
        </Link>
        <textarea
          className="bg-white w-[80%] min-h-[5rem] rounded-md m-2 mr-5 p-2 focus:outline-none"
          placeholder="'sup?"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      <input
        type="file"
        name="image"
        ref={fileInputRef}
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ display: "none" }}
      />

      {image && (
        <p className="text-white text-sm">
          Attached: <span className="font-semibold">{image.name}</span>
        </p>
      )}
      <div className="flex justify-end w-full ">
        <button
          type="button"
          onClick={handleAttachClick}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:ring-1 hover:ring-yellow-100"
        >
          Attach
        </button>
        <button
          type="submit"
          className="bg-red-100 px-4 py-1 rounded-md text-white hover:ring-1 hover:ring-blue-50"
        >
          Post
        </button>
      </div>
    </form>
  );
};
export default Post;
