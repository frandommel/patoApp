import React, { useEffect, useRef } from "react";
import Camera from "../components/Camera";

const Home = ({ url, setUrl }) => {
  const buttonRef = useRef(null);
  <div>
    <Camera buttonRef={buttonRef} url={url} setUrl={setUrl} />
  </div>;
};

export default Home;
