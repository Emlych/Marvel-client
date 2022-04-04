import "./detail.css";
import Header from "../../components/header/Header";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = ({ base_url, setUser, setSignIn, token }) => {
  const { id } = useParams();

  //data fetched from api
  const [characterInfoIsLoading, setCharacterInfoIsLoading] = useState(true);
  const [characterInfos, setCharacterInfos] = useState();

  const [characterComicsIsLoading, setCharacterComicsIsLoading] =
    useState(true);
  const [characterComics, setCharacterComics] = useState();

  //display comic description when click on it
  const [comicDescription, setcomicDescription] = useState(false);

  //Backend: get specific character info with provided id
  useEffect(() => {
    const fetchCharacterInfo = async () => {
      try {
        const response = await axios.get(`${base_url}/character/${id}`);
        console.log("character info : ", response.data);
        setCharacterInfos(response.data);
        setCharacterInfoIsLoading(false);
      } catch (error) {
        console.log("error in Character info ===>", error.message);
      }
    };
    fetchCharacterInfo();
  }, [id]);

  //Backend: get comic by title (no fetch on id possible for comics)
  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await axios.get(`${base_url}/comics/${id}`);
        setCharacterComics(response.data.comics);
        setCharacterComicsIsLoading(false);
      } catch (error) {
        console.log("error in Comic ==>", error.message);
      }
    };
    fetchComic();
  }, [id]);

  return (
    <div>
      <Header setSignIn={setSignIn} token={token} setUser={setUser} />
      <div className="detail">
        {/* Left side of screen */}
        <div className="character-detail">
          {characterInfoIsLoading ? (
            <span>Data is loading.</span>
          ) : (
            <div className="character-detail__card">
              <div className="character-detail__card--container">
                <img
                  src={`${characterInfos.thumbnail.path}.${characterInfos.thumbnail.extension}`}
                  alt=""
                />
                <h2>{characterInfos.name}</h2>
                <p>{characterInfos.description}</p>
                <button>Add to my favorites</button>
              </div>
            </div>
          )}
        </div>

        {/* Right side of screen */}
        <div className="character-comics">
          <h3>Featured in those comics : </h3>
          {characterComicsIsLoading ? (
            <span>Character comics loading.</span>
          ) : (
            <div className="character-comics__container">
              {characterComics.map((item) => (
                <div key={item._id}>{item.title}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
