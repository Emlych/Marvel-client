import "./comics.css";
import Header from "../../components/header/Header";
import Presentation from "../../components/presentation/Presentation";
import Caroussel from "../../components/caroussel/Caroussel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Comics = ({ base_url, setSignIn, token, setUser }) => {
  return (
    <div>
      <Header setSignIn={setSignIn} token={token} setUser={setUser} />

      <div className="comics">
        <div className="comics-presentation">
          <Presentation base_url={base_url} setSignIn={setSignIn} />
          <FontAwesomeIcon icon={faChevronDown} className="comics-icon" />
        </div>
        <Caroussel base_url={base_url} setSignIn={setSignIn} />
      </div>
    </div>
  );
};

export default Comics;
