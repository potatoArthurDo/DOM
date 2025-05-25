import React from "react";

const Dot = ({action, amount}) => {
  return (
    <>
      <button className="rounded-full text-xs text-white cursor-pointer underline ml-[3rem] my-1 ">
        {amount}
      </button>
      <a href="#" >
        <img src= {`/assets/images/${action}.png`}alt="" className="w-[1.5rem] ml-1/2" />
      </a>
    </>
  );
};
export default Dot;
