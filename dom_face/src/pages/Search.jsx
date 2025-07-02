import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import api from "../api";
import ProfileCard from "../components/ProfileCard";
import Domed from "../components/Domed";

const Search = () => {
  const [profiles, SetProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [searchPost, setSearchPost] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() === "") {
        SetProfiles([]);
        return;
      }

      getProfiles(search);
      getSearchPosts(search);
    }, 300); // debounce for 300ms

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const getProfiles = () => {
    api
      .get(`search-users/?q=${search}`)
      .then((res) => {
        SetProfiles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSearchPosts = () => {
    api
      .get(`posts/search/?q=${search}`)
      .then((res) => {
        setSearchPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="custom-dark-gradient relative min-h-screen w-screen overflow-x-hidden flex flex-row items-center justify-center">
      <Menu />
      <div className=" w-[75vw]  lg:w-[85vw]">
        <div className="custom-dark-gradient min-h-[100vh] p-4 relative flex flex-col items-center justify-start">
          <h1 className="text-white">Search</h1>
          <div class="w-[95%] lg:w-[50%] mx-auto rounded-full shadow-md p-2 flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              class="w-full px-4 py-2 text-white custom-gradient border-1 border-yellow-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-50"
            />
            <button class=" text-white my-2 bg-red-100 cursor-pointer hover:ring-1 hover:ring-yellow-100 p-2 rounded-md">
              Search
            </button>
          </div>

          <div className="w-[50%] lg:w-[100%] h-full flex flex-col justify-center items-center">
            {profiles.map((profile) => (
              <ProfileCard profile={profile} />
            ))}
          </div>
            <hr class="my-4 border w-[50%] border-blue-100" />

           <div className="w-[50%] lg:w-[100%] h-full flex flex-col justify-center items-center">
            {searchPost.map((post) => (
                <Domed
                    post={post}
                    deletePost={null}
                />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
export default Search;
