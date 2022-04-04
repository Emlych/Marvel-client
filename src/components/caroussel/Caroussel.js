import "./caroussel.css";
import { useState, useEffect } from "react";
import axios from "axios";

//Import components
import Paging from "../paging/Paging";
import CarousselCard from "./CarousselCard";

const Caroussel = ({ base_url, setSignIn }) => {
  const [comics, setComics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

  //Load comics
  useEffect(() => {
    const fetchComics = async () => {
      try {
        const skip = limit * (page - 1);
        const response = await axios.get(
          `${base_url}/comics?limit=${limit}&skip=${skip}&title=`
        );
        setComics(response.data);
        console.log("comics : ", response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("error in Comic ==>", error.message);
      }
    };
    fetchComics();
  }, [limit, page]);

  return (
    <div>
      {isLoading ? (
        <div></div>
      ) : (
        <div className="caroussel">
          <div className="title">All Comics</div>
          <div className="number">
            Choose number of comics to display :{" "}
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={limit}
              onChange={(event) => setLimit(event.target.value)}
            />
          </div>
          <div className="container">
            {comics.results.map((item) => {
              return (
                <div key={item._id} className="card">
                  <CarousselCard
                    item={item}
                    base_url={base_url}
                    setSignIn={setSignIn}
                  />
                </div>
              );
            })}
          </div>

          <Paging page={page} setPage={setPage} comics={comics} />
        </div>
      )}
    </div>
  );
};

export default Caroussel;
