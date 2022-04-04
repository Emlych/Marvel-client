//visual
import "./presentation.css";
import "../search/search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

//immport components
import ButtonSlider from "./ButtonSlider";
import PresentationCard from "./PresentationCard";

import { useState, useEffect } from "react";
import axios from "axios";

const Presentation = ({ base_url, setSignIn }) => {
  const [comics, setComics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const handleSearch = (event) => setSearch(event.target.value);

  const [slideAnim, setSlideAnim] = useState({ index: 1, inProgress: false });

  //Load comics
  useEffect(() => {
    const fetchComics = async () => {
      const limit = 10;
      const page = 1;
      try {
        const skip = limit * (page - 1);
        const response = await axios.get(
          `${base_url}/comics?limit=${limit}&skip=${skip}&title=${search}`
        );
        setComics(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error in Comic ==>", error.message);
      }
    };
    fetchComics();
  }, [search]);

  //handle slides
  const nextSlide = () => {
    if (slideAnim.index !== comics.limit && !slideAnim.inProgress) {
      setSlideAnim({ index: slideAnim.index + 1 });
      setTimeout(() => {
        setSlideAnim({ index: slideAnim.index + 1, inProgress: false });
      }, 400);
    } else if (slideAnim.index === comics.limit && !slideAnim.inProgress) {
      setSlideAnim({ index: 1, inProgress: true });
      setTimeout(() => {
        setSlideAnim({ index: 1, inProgress: false });
      }, 400);
    }
  };
  const prevSlide = () => {
    if (slideAnim.index !== 1 && !slideAnim.inProgress) {
      setSlideAnim({ index: slideAnim.index - 1, inProgress: true });
      setTimeout(() => {
        setSlideAnim({ index: slideAnim.index - 1, inProgress: false });
      }, 400);
    } else if (slideAnim.index === 1 && !slideAnim.inProgress) {
      setSlideAnim({ index: 5, inProgress: true });
      setTimeout(() => {
        setSlideAnim({ index: 5, inProgress: false });
      }, 400);
    }
  };

  return (
    <div className="presentation">
      <div className="left">
        <div className="container">
          <div className="title">
            Find all your favorite Marvel Comics in this fantastic library.
          </div>
          <div className="details">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
            excepturi neque eveniet nisi numquam exercitationem repellendus odio
            enim possimus dolor mollitia sapiente autem magnam ratione quo,
            soluta maxime natus itaque!
          </div>
          <form className="search">
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <input
              type="text"
              name="searchComic"
              id="searchComic"
              value={search}
              onChange={handleSearch}
              placeholder="Type a comic name"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className="right">
        <div className="container">
          {isLoading ? (
            <span>Data is loading</span>
          ) : (
            <div className="right-container">
              {comics.results.map((item, index) => {
                return (
                  <div key={item._id}>
                    <PresentationCard
                      slideAnim={slideAnim}
                      index={index}
                      item={item}
                      base_url={base_url}
                      setSignIn={setSignIn}
                    />
                  </div>
                );
              })}
              <ButtonSlider moveSlide={nextSlide} direction={"next"} />
              <ButtonSlider moveSlide={prevSlide} direction={"prev"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Presentation;
