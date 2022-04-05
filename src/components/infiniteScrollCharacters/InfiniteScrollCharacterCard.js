import "./infiniteScrollCharacters.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const InfiniteScrollCharacterCard = ({ item, setSignIn, base_url }) => {
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
    <div className="card-list-item">
      <FontAwesomeIcon
        icon={faHeart}
        className="fav-icon"
        onClick={() => handleFav()}
      />
      <Link to={`/detail/${item._id}`}>
        <img
          src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
          alt="card of comic"
        />
        <div className="card-name">{item.name} </div>
      </Link>
    </div>
  );
};

export default InfiniteScrollCharacterCard;
