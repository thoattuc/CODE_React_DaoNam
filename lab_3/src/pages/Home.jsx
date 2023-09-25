import React from "react";
import Navbar from "../components/Navbar";

function Home(props) {
  return (
    <div>
      <Navbar brands={props.brands} cates={props.cates}/>
      #Home
    </div>
  );
}

export default Home;
