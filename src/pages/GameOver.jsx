import React from "react";
import Template from "../components/Template";
import { CurrentPageContext } from "../contexts/CurrentPageContext";
import ScorePanel from "../components/ScorePanel";
CurrentPageContext;

const GameOver = () => {
  return (
    <Template className = "flex flex-col justify-between items-center">
      <h1 className="text-[35px] font-medium text-center text-white mt-10">
        Game Over
      </h1>
      <ScorePanel />
      <div className="mb-10">
        <h3
          className = "hover:text-orange-500 cursor-pointer text-center text-xl uppercase"
          onClick={() => window.location.reload()}
        >
          back to title
        </h3>
      </div>
    </Template>
  );
};

export default GameOver;
