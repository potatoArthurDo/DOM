import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import api from "../api";
import ProfileCard from "../components/ProfileCard";

const Follows = () => {
  const [follows, setFollows] = useState([]);
  const [search, setSearch] = useState("");
  const [searchFollow, setSearchFollow] = useState([]);

  useEffect(() => {
    getFollows();
  }, []);

  //fetch all
  const getFollows = () => {
    api
      .get(`follows/`)
      .then((res) => {
        setFollows(res.data);
        setSearchFollow(res.data);
      })
      .catch((err) => console.log(err));
  };
  // Filter when search input changes
  useEffect(() => {
    const query = search.toLowerCase();
    const filtered = follows.filter((profile) =>
      profile.username.toLowerCase().includes(query)
    );
    setSearchFollow(filtered);
  }, [search, follows]);
  return (
    <div className="custom-dark-gradient relative min-h-screen w-screen overflow-x-hidden flex flex-row items-center justify-center ">
      <Menu />
      <div className=" w-[75vw]  lg:w-[85vw]">
        <div className="custom-dark-gradient min-h-[100vh] p-4 flex flex-col items-center justify-start ml-2">
          <h1 className="text-white">Follows</h1>
          <div class="w-[95%] lg:w-[50%] mx-auto rounded-full shadow-md p-2 flex flex-col items-center justify-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              class="w-full px-4 py-2 text-white custom-gradient border-1 border-yellow-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-50"
            />
            <button class=" text-white my-2 bg-red-100 cursor-pointer hover:ring-1 hover:ring-yellow-100 p-2 rounded-md">
              Search
            </button>
          </div>
          <div className="w-[95%] lg:w-[50%] h-full flex flex-col justify-center items-center">
            {searchFollow.map((follow) => (
              <ProfileCard profile={follow} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Follows;
