import React, { useEffect, useState } from "react";
import api from "../api";

const ProfileDetailCard = ({profile_id}) => {
  const [profile, SetProfile] = useState([]);

  useEffect(() => {
    GetProfile();
  }, [profile_id])
   const GetProfile = () => {
    api
      .get(`profile/${profile_id}/`)
      .then((res) => {
        SetProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="relative w-[95%] lg:w-[50%]  h-auto custom-gradient border-2 border-blue-50 flex justify-start items-center">
      <div className= "w-50 h-50 rounded-full overflow-hidden relative border-2 border-blue-50 m-5">
        <img src={profile.avatar} alt="" className="absolute inset-0 rounded-full object-cover" />
      </div>
      <div className="p-3">
        <h1 className="text-white text-3xl">{profile.name}</h1>
        <h2 className="text-yellow-100 text-xl">@{profile.username}</h2>
      </div>
    </div>
  );
};
export default ProfileDetailCard;
