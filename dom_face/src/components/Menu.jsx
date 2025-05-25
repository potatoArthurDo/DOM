import React from "react";
import MenuItem from "../components/MenuItem";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className="fixed top-0 left-0 custom-gradient w-[25vw] h-screen lg:w-[15vw] m-0 p-0 z-10">
        <div className="flex flex-col relative w-full h-full justify-evenly items-center">
          <div className="flex flex-col relative h-[80%] w-full items-center">
            <a href="/" className="h-1/8 w-auto mt-2">
              <img
                src="/assets/images/logo.png"
                alt="logo"
                className="h-full w-auto"
              />
            </a>
            <MenuItem name="home" icon="/assets/images/home.png" />
            <MenuItem name="profile" icon="/assets/images/human.png" />
            <MenuItem name="search" icon="/assets/images/search.png" />
            <MenuItem name="follows" icon="/assets/images/friends.png" />
          </div>
          <div className="relative w-auto h-auto my-4 mx-auto">
            <a
              href="#"
              className=" bg-white-50 w-[4rem] h-[4rem] rounded-[100%] flex justify-center items-center hover:bg-yellow-50"
            >
              <img
                src="/assets/images/setting.png"
                alt="settings"
                className="filter invert hue-rotate-90 w-[2.5rem] h-auto "
              />
            </a>
          </div>
          <div className="bg-red-100  p-2 rounded-md border-1 border-yellow-100">
            <button className="cursor-pointer text-white "><Link to="/logout">Log Out</Link></button>
          </div>
        </div>
      </div>
    )
}
export default Menu;