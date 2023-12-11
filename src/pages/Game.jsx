import React, { useContext, useEffect, useState } from "react";
import Template from "../components/Template";
import Home from "./Home";
import { CurrentPageContext } from "../contexts/CurrentPageContext";
import { BsPauseFill } from "react-icons/bs";
import ConfigPanel from "../components/ConfigPanel";
import Canvas from "../components/Canvas";
import { PauseGame, gamePaused } from "../utils/GameData";
import { generateWord } from "../utils/utilFunctions";

const Game = () => {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <Template className="flex flex-col justify-between items-center">
        <h1 className="text-[35px] font-medium text-center text-white mt-10">
          Settings
        </h1>
        <ConfigPanel />
        <div className="mb-10">
          <h3
            className="hover:text-orange-500 cursor-pointer text-center text-xl mb-4 mb-10 uppercase"
            onClick={() => {
              setPaused(false);
              PauseGame(!gamePaused);
            }}
          >
            resume
          </h3>
          <h3
            className="hover:text-orange-500 cursor-pointer text-center text-xl mb-10 uppercase"
            onClick={() => window.location.reload()}
          >
            back to title
          </h3>
        </div>
      </Template>
      {/* --------------------------------- */}
      {/* this is where the game is rendered */}
      <div
        className={`w-full  absolute top-0 left-0 ${paused ? "hidden" : ""}`}
      >
        <Template>
          <BsPauseFill
            onClick={() => {
              PauseGame(!gamePaused);
              setPaused(true);
            }}
            className="text-gray-100 opacity-30 hover:text-orange-500 hover:opacity-100 cursor-pointer absolute top-3"
            size="30"
          />
          <Canvas />
        </Template>
      </div>
    </>
  );
};

export default Game;
