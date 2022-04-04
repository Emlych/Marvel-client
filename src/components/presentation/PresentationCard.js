import "./presentation.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";

const PresentationCard = ({ slideAnim, index, item, base_url, setSignIn }) => {
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
    <div
      className={slideAnim.index === index + 1 ? "slide active-anim" : "slide"}
    >
      <img
        src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
        alt="card of comic"
      />

      <div className="title">
        {item.title}
        <FontAwesomeIcon
          icon={faHeart}
          className={isFav ? "icon active-icon" : "icon inactive-icon"}
          onClick={() => handleFav()}
        />
      </div>
    </div>
  );
};

export default PresentationCard;
