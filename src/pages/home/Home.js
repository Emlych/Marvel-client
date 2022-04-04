import "./home.css";
// import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import logo from "../../assets/MarvelLogo.png";
import { Link } from "react-router-dom";
import Background1 from "../../assets/iron-man-hero-landing-xpxbmcu6l2c44u4y.jpg";
import Background2 from "../../assets/6227bc2e92d8b.jpg";
import Circle from "../../components/circle/Circle";

const Home = () => {
  //store a reference to the box div
  const homeRef = useRef();

  //background ressources
  const backgroundSrc = [Background1, Background2];

  //wait until DOM has been rendered
  // useEffect(() => {
  //   const TLBottom = gsap.timeline();
  //   TLBottom.to(homeRef.current, { duration: 0.6, y: "0%" });
  // });
  //special cursor
  // const circleRefs = useRef([]);
  // useEffect(() => {
  //   circleRefs.current.forEach((ref) =>
  //     ref.moveTo(window.innerWidth / 2, window.innerHeight / 2)
  //   );
  //   const onMove = ({ clientX, clientY }) => {
  //     circleRefs.current.forEach((ref) => ref.moveTo(clientX, clientY));
  //   };
  //   window.addEventListener("pointermove", onMove);

  //   return () => window.removeEventListener("pointermove", onMove);
  // }, []);
  // const addCircleRef = (ref) => {
  //   if (ref) circleRefs.current.push(ref);
  // };

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${backgroundSrc[0]})`,
      }}
      ref={homeRef}
    >
      <div className="topbar">
        <img src={logo} alt="marvel logo" />
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
          </ul>
        </nav>
      </div>
      {/* <Circle size="sm" ref={addCircleRef} delay={0} />
      <Circle size="md" ref={addCircleRef} delay={0.1} />
      <Circle size="lg" ref={addCircleRef} delay={0.2} /> */}
      <div className="dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="welcome">The Marvel Encyclopedia</div>
      <div className="home-description">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos,
        provident? Minus libero, excepturi aperiam eligendi omnis, quo
        recusandae accusantium minima cupiditate veritatis ea suscipit? Incidunt
        voluptates nemo quam reiciendis alias.
      </div>
    </div>
  );
};

export default Home;
