import React from "react";
import { Search as SearchComp, Navbar, Sidebar } from "../components";

const Search = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <SearchComp />
    </div>
  );
};

export default Search;
