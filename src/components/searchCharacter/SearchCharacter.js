//visuals
import "./searchCharacter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import axios from "axios";

//import component
import SearchCharacterCard from "./SearchCharacterCard";

const SearchCharacter = ({ base_url, setSignIn }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = limit * (page - 1);
        const response = await axios.get(
          `${base_url}/characters?limit=${limit}&skip=${skip}&name=${search}`
        );
        console.log("response data for characters ==>", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error in personnages ==>", error.message);
      }
    };
    fetchData();
  }, [page, search]);
  return (
    <div className="search-character">
      <form className="search">
        <FontAwesomeIcon icon={faSearch} className="icon" />
        <input
          type="text"
          name="searchComic"
          id="searchComic"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Type a character name"
        />
      </form>
      {isLoading ? (
        <span>Data is loading</span>
      ) : (
        <div className="search-list">
          {data.results.map((item) => {
            return (
              <div className="search-list-item" key={item._id}>
                <SearchCharacterCard
                  item={item}
                  setSignIn={setSignIn}
                  base_url={base_url}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchCharacter;
