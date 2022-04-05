import "./signup.css";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";

const Signup = ({ setSignIn, base_url, setUser }) => {
  //select signup or login
  const [signup, setSignup] = useState(true);

  //form inputs and submit action
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  //Fetch a random name in backend
  const generateHeroName = async () => {
    try {
      const response = await axios.get(`${base_url}/user/signup/username`);
      console.log("Random name : ", response.data.randomUsername);
      setusername(response.data.randomUsername);
    } catch (error) {
      console.log("error from /user/signup/username route ==>", error.message);
    }
  };

  //Submit form to backend
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) seterrorMessage("Missing field.");
    else {
      const createUser = async () => {
        try {
          const response = await axios.post(`${base_url}/user/signup`, {
            username: username,
            email: email,
            password: password,
          });
          console.log("response from signup : ", response);
          if (response.data.token) {
            setUser(response.data.token);
            setSignIn(false);
          }
        } catch (error) {
          console.log("error ==>", error.message);
        }
      };
      createUser();
    }
  };
  return (
    <div className="modal">
      <div className="modal-inside">
        <button
          className="close"
          onClick={() => {
            setSignIn(false);
            document.body.style.overflow = "scroll";
          }}
        >
          &times;
        </button>
        <div className="modal-header">
          <h2
            className={signup ? "active" : undefined}
            onClick={() => setSignup(true)}
          >
            Sign up
          </h2>
          <h2
            className={!signup ? "active" : undefined}
            onClick={() => setSignup(false)}
          >
            Log in
          </h2>
        </div>

        {signup && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Hero Name</label>
            <div className="hero-username">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your hero name"
                value={username}
                onChange={(event) => setusername(event.target.value)}
              />
              <FontAwesomeIcon
                icon={faDice}
                className="dice-icon"
                onClick={() => generateHeroName()}
              />
            </div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="username"
              id="username"
              placeholder="Enter your email adress"
              value={email}
              onChange={(event) => setemail(event.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter a password"
              value={password}
              onChange={(event) => setpassword(event.target.value)}
            />
            {errorMessage && <p className="warning">{errorMessage}</p>}

            <button type="submit">Sign up</button>
          </form>
        )}

        {!signup && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="username"
              id="username"
              placeholder="Enter your email adress"
              value={email}
              onChange={(event) => setemail(event.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter a password"
              value={password}
              onChange={(event) => setpassword(event.target.value)}
            />
            {errorMessage && <p className="warning">{errorMessage}</p>}
            <button type="submit">Connect</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
