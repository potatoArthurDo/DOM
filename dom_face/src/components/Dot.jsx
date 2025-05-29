import React from "react";

const Dot = ({ action, amount, onClick, liked }) => {
  const icons =
    action === "like"
      ? liked
        ? `/assets/images/red_heart.png`
        : `/assets/images/like.png`
      : `/assets/images/${action}.png`;
  return (
    <>
   
      <button
        onClick={onClick}
        className={`rounded-full text-xs text-white cursor-pointer underline ml-[3rem] my-1  flex focus:oulint_none ${liked && action === "like" ? "text-red-500"  : ""}`}
        aria-pressed = {liked ? "true" : "false"}
      >
        
       <span className="text-white mx-2 mt-1">{amount}</span>
        <img
          src={icons}
          alt=""
          className="w-[1.5rem] ml-1/2"
        />
        </button>
    </>
  );
};
export default Dot;
