import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({profile}) => {
    return (
        <Link to={`/profile/${profile.id}/`} className="w-[50%] custom-gradient ring-1 ring-blue-50 rounded-md my-2 h-full flex items-center justify-start">
            <div className="m-2 w-auto h-auto">
                <img src={profile.avatar} alt="avatar" className="rounded-full w-[5rem] h-[5rem] cursor-pointer"/>
            </div>
            <div className="m-2">
                <h5 className="text-white underline hover:text-yellow-50 cursor-pointer">@{profile.username}</h5>
                <p className="text-blue-50 ">description is not that cool...</p>
            </div>
        </Link>
    )
}
export default ProfileCard