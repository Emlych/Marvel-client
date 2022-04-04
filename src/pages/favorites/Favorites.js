import "./favorites.css";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

//import components
import Header from "../../components/header/Header";

const Favorites = ({ token, base_url, setUser }) => {
  const [favComics, setfavComics] = useState([]);
  //const [favCharacters, setfavCharacters] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  //load favorite comics and characters
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${base_url}/favorites/read/`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setfavComics(response.data.favComics);
        // setfavCharacters(response.data.favorites.favCharacters);
        setisLoading(false);
      } catch (error) {
        console.log(
          "Could not fetch your favorite characters and comics : ",
          error.message
        );
      }
    };
    fetchFavorites();
  }, []);

  //Remove from favorite
  const removeFav = async (item) => {
    try {
      const response = await axios.post(
        `${base_url}/favorites/remove`,
        { item },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      console.log("Favorite removed : ", response.data);
      window.location.reload();
    } catch (error) {
      console.log("Error in remove fav : ", error.message);
    }
  };

  return token ? (
    <div>
      <Header token={token} setUser={setUser} />
      <div className="favorite">
        <h2>All your favorite Marvel items</h2>
        <div className="favorite-container">
          <h3>Favorite Characters</h3>
        </div>

        <div className="favorite-container">
          <h3>Favorite Comics</h3>
          {isLoading ? (
            <span>Favorite comics are loading.</span>
          ) : (
            <div>
              {favComics.map((item) => {
                return (
                  <div key={item._id} className="fav-card">
                    <button
                      className="fav-close"
                      onClick={() => removeFav(item)}
                    >
                      &times;
                    </button>
                    <img src={item.img_url} alt={item.title} />
                    <h4>{item.title}</h4>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Favorites;
