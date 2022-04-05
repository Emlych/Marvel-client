//visual
import "./searchCharacter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const SearchCharacterCard = ({ item, setSignIn, base_url }) => {
  //Handle favorites
  const [isFav, setisFav] = useState(false);
  //open modal if no token
  const handleFav = () =>
    Cookies.get("userToken") ? postFav() : setSignIn(true);

  //Add or remove favorite
  const postFav = async () => {
    setisFav(!isFav);
    try {
      const response = await axios.post(
        `${base_url}/favorites/handle`,
        { item, type: "character" },
        {
          headers: { authorization: `Bearer ${Cookies.get("userToken")}` },
        }
      );
      console.log("favorite handled = ", response.data);
    } catch (error) {
      console.log("handle fav error : ", error.message);
    }
  };
  return (
    <div>
      <FontAwesomeIcon
        icon={faHeart}
        className="fav-icon"
        onClick={() => handleFav()}
      />

      <Link to={`/detail/${item._id}`}>
        <div className="search-item-background"></div>
        <img
          src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
          alt="card of character"
        />
        <div className="search-card">
          <div>{item.name}</div>
          <div>{item.description}</div>
        </div>
      </Link>
    </div>
  );
};

export default SearchCharacterCard;
