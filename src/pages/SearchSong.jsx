import React from "react";
import { Navbar, Sidebar, SearchSong as SearchSongComp } from "../components";
const SearchSong = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <SearchSongComp />
    </div>
  );
};

export default SearchSong;
