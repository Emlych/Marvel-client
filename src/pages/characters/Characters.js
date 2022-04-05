import "./characters.css";

//import components
import Header from "../../components/header/Header";
import SearchCharacter from "../../components/searchCharacter/SearchCharacter";
import InfiniteScrollCharacters from "../../components/infiniteScrollCharacters/InfiniteScrollCharacters";

const Characters = ({ base_url, setSignIn, token, setUser }) => {
  return (
    <div>
      <Header setSignIn={setSignIn} token={token} setUser={setUser} />
      <div className="characters">
        <div>
          <h3>Search for a character</h3>
          <SearchCharacter base_url={base_url} setSignIn={setSignIn} />
        </div>

        <h3>Explore</h3>
        <p>Keep on scrolling to discover other characters.</p>
        <InfiniteScrollCharacters base_url={base_url} />
      </div>
    </div>
  );
};

export default Characters;
