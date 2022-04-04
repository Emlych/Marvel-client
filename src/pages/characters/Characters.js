import "./characters.css";
import { useState, useEffect } from "react";
import axios from "axios";

//import components
import Header from "../../components/header/Header";
import SearchCharacter from "../../components/searchCharacter/SearchCharacter";
import InfiniteScrollCharacters from "../../components/infiniteScrollCharacters/InfiniteScrollCharacters";

const Characters = ({ base_url, setSignIn, token, setUser }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = limit * (page - 1);
        const response = await axios.get(
          `${base_url}/characters?limit=${limit}&skip=${skip}&name=`
        );
        console.log("response data for characters ==>", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error in personnages ==>", error.message);
      }
    };
    fetchData();
  }, [page, limit]);

  return (
    <div>
      <Header setSignIn={setSignIn} token={token} setUser={setUser} />
      <div className="characters">
        <div>
          <h3>Search for a character</h3>
          <SearchCharacter base_url={base_url} />
        </div>

        <h3>Explore</h3>
        <p>Keep on scrolling to discover other characters.</p>
        <InfiniteScrollCharacters base_url={base_url} />
      </div>
    </div>
  );
};

export default Characters;
