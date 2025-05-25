import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

const MenuItem = ({ name, icon }) => {
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    getCurrentUser();
  }, [])

  const getCurrentUser = () => {
    api
      .get(`current_user/`)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const direct = () => {
    if (name === "home") {
      return "/";
    } 
    if (name === "profile") {
        return `/profile/${currentUser.id}`
    }
    else {return `/${name}`}
    
  };

  return (
    <Link
      to={direct()}
      className="relative bg-gray-50 w-7/8 h-1/12 mx-2 my-1 flex justify-center items-center border-1 border-blue-50 hover:bg-yellow-50"
    >
      <img
        src={icon}
        alt={name}
        className="w-1/6 h-auto object-cover filter invert hue-rotate-90 mx-2 absolute top-1/5 left-0"
      />
      <h5 className="text-2xl text-blue-50 capitalize">{name} </h5>
    </Link>
  );
};

export default MenuItem;
