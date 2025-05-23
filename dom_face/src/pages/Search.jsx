import React from "react";
import Menu from "../components/Menu";
const Search = () => {
  return (
    <div className="custom-dark-gradient relative min-h-screen w-screen overflow-x-hidden flex flex-row items-center justify-center ">
      <Menu />
      <div className="ml-[25vw] w-[75vw] lg:ml-[15vw] lg:w-[85vw]">
        <div className="custom-dark-gradient  min-h-[100vh] p-4 flex flex-col items-start justify-start ml-2"></div>
      </div>
    </div>
  );
};
export default Search;
