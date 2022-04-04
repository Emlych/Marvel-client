import "./search.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (event) => setSearch(event.target.value);
  const submitSearch = (event) => {
    event.preventDefault();
    alert("Change caroussel items on right side");
  };

  return (
    <form className="search" onSubmit={submitSearch}>
      <FontAwesomeIcon icon={faSearch} className="icon" />
      <input
        type="text"
        name="searchComic"
        id="searchComic"
        value={search}
        onChange={handleSearch}
        placeholder="Type a comic name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
