import React, { useEffect, useState } from "react";
import api from "../api";
import { getUserIdFromToken } from "../auth";

const ProfileDetailCard = ({ profile_id }) => {
  const [profile, SetProfile] = useState([]);

  const [isFollowing, setIsFollowing] = useState(false);

  const currentUserId = getUserIdFromToken();

  const handleFollowToggle = () => {
    api
      .post(`profile/${profile_id}/follow/`)
      .then((res) => {
        if (res.data.message === "Followed") {
          setIsFollowing(true);
        } else if (res.data.message === "Unfollowed") {
          setIsFollowing(false);
        }
        GetProfile();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetProfile();
    console.log("profile.user:", profile.user);
console.log("currentUserId:", currentUserId);

  }, [profile_id]);

  useEffect(() => {
    if (profile && typeof profile.is_following !== "undefined") {
      setIsFollowing(profile.is_following);
    }
  }, [profile]);

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
      <div className="w-50 h-50 rounded-full overflow-hidden relative border-2 border-blue-50 m-5">
        <img
          src={profile.avatar}
          alt=""
          className="absolute inset-0 rounded-full object-cover w-full"
        />
      </div>
      <div className="p-3 flex justify-between items-center relative w-[65%]">
        <div>
          <h1 className="text-white text-3xl">{profile.name}</h1>
          <h2 className="text-yellow-100 text-xl">@{profile.username}</h2>
          <p className="text-white">description is here</p>
        </div>
        <div className="">
          {profile.user !== currentUserId && (
            <button
              onClick={handleFollowToggle}
              className="bg-red-100 border border-yellow-100 text-white p-2 rounded-md"
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileDetailCard;
