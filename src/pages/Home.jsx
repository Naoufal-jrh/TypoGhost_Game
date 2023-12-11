import React from "react";
import Title from "../components/Title";
import Template from "../components/Template";
import HomeMenu from "../components/HomeMenu";
import { generateWord } from "../utils/utilFunctions";

const Home = () => {
  return (
    <>
      <Template className="flex flex-col justify-between">
        <Title />
        <HomeMenu />
      </Template>
    </>
  );
};

export default Home;
