import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//import pages
import Home from "./pages/home/Home";
import Comics from "./pages/comics/Comics";
import Characters from "./pages/characters/Characters";
import Favorites from "./pages/favorites/Favorites";
import Detail from "./pages/detail/Detail";
import Signup from "./components/signup/Signup";

function App() {
  //api url
  const base_url = "http://localhost:4000";

  //sign in
  const [signIn, setSignIn] = useState(false);

  //handle authentication
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const setUser = (token) => {
    token
      ? Cookies.set("userToken", token, { expires: 3 })
      : Cookies.remove("userToken");
    setToken(token);
  };

  return (
    <div className="app">
      <Router>
        {signIn && (
          <Signup base_url={base_url} setUser={setUser} setSignIn={setSignIn} />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/comics"
            element={
              <Comics
                base_url={base_url}
                setSignIn={setSignIn}
                token={token}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/characters"
            element={
              <Characters
                base_url={base_url}
                setSignIn={setSignIn}
                token={token}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Detail
                base_url={base_url}
                setSignIn={setSignIn}
                token={token}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites token={token} base_url={base_url} setUser={setUser} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
