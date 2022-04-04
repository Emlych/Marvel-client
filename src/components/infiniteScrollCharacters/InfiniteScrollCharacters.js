import "./infiniteScrollCharacters.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CharactersList = ({ base_url }) => {
  const [charactersData, setCharactersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const infiniteFetchCharacters = async () => {
      try {
        const skip = limit * (page - 1);
        const response = await axios.get(
          `${base_url}/characters?limit=${limit}&skip=${skip}&name=`
        );
        console.log("response data for characters list ==>", response.data);
        setCharactersData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("error in characters list ==>", error.message);
      }
    };
    infiniteFetchCharacters();
  }, [page, limit]);

  useEffect(() => {
    const infiniteCheck = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop === clientHeight)
        setPage((page) => page + 1);
    };
    window.addEventListener("scroll", infiniteCheck);
    return () => {
      window.removeEventListener("scroll", infiniteCheck);
    };
  }, [limit]);
  return (
    <div className="characterslist">
      {isLoading ? (
        <span>Characters are loading.</span>
      ) : (
        <div>
          <div className="number">
            Choose number of characters to display :{" "}
            <input
              type="number"
              name="quantity"
              id="char_quantity"
              value={limit}
              onChange={(event) => setLimit(event.target.value)}
            />
          </div>
          <div className="card-list">
            {charactersData.map((item) => {
              return (
                <div className="card-list-item" key={item._id}>
                  <Link to={`/detail/${item._id}`}>
                    <img
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      alt="card of comic"
                    />
                    <div className="card-name">{item.name}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharactersList;
