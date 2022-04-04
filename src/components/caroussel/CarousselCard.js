import "./caroussel.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";

const CarousselCard = ({ item, base_url, setSignIn }) => {
  //Handle favorites
  const [isFav, setisFav] = useState(false);
  //open modal if no token
  const handleFav = () => {
    Cookies.get("userToken") ? postFav() : setSignIn(true);
  };
  //Add or remove favorite
  const postFav = async () => {
    setisFav(!isFav);
    try {
      const response = await axios.post(
        `${base_url}/favorites/handle`,
        { item, type: "comic" },
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
      <div className="card-img">
        <img
          src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
          alt="card of comic"
        />
      </div>
      <div className="card-infos">
        <div className="card-title">
          {item.title}{" "}
          <FontAwesomeIcon
            icon={faHeart}
            className={
              isFav ? "fav-icon active-icon" : "fav-icon inactive-icon"
            }
            onClick={() => handleFav()}
          />
        </div>
      </div>
    </div>
  );
};

export default CarousselCard;
