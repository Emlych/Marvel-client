//visual
import "./header.css";
import logo from "../../assets/MarvelLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMask } from "@fortawesome/free-solid-svg-icons";

//functionnal
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setSignIn, token, setUser }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <Link to={`/`}>
        <img src={logo} alt="marvel logo" />
      </Link>

      <nav>
        <ul>
          <Link to={`/characters`}>
            <li>Characters</li>
          </Link>
          <Link to={`/comics`}>
            <li>Comics</li>
          </Link>
          <Link to={`/favorites`}>
            <li>Favorites</li>
          </Link>
          {token ? (
            <li
              className="disconnect"
              onClick={() => {
                setUser();
                navigate("/");
              }}
            >
              Disconnect
            </li>
          ) : (
            <li
              className="signup"
              onClick={() => {
                setSignIn(true);
                document.body.style.overflow = "scroll";
              }}
            >
              Sign up <FontAwesomeIcon icon={faMask} className="icon" />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
