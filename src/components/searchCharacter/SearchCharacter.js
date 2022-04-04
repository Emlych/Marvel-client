//visuals
import "./searchCharacter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchCharacter = ({ base_url }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState("");
  const handleSearch = (event) => setSearch(event.target.value);

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
          onChange={handleSearch}
          placeholder="Type a character name"
        />
      </form>
      {isLoading ? (
        <span>Data is loading</span>
      ) : (
        <div className="search-list">
          {data.results.map((item) => {
            return (
              <div className="search-list-item">
                <FontAwesomeIcon icon={faHeart} className="fav-icon" />

                <Link to={`/detail/${item._id}`} key={item._id}>
                  <div className="search-item-background"></div>
                  <img
                    src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                    alt="card of comic"
                  />
                  <div className="search-card">
                    <div>{item.name}</div>
                    <div>{item.description}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchCharacter;
