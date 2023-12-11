import React, { useContext } from "react";
import Button from "./Button";
import { CurrentPageContext } from "../contexts/CurrentPageContext";
import Game from "../pages/Game";
import Settings from "../pages/Settings";
const HomeMenu = () => {
  const { setPage } = useContext(CurrentPageContext);
  const GamePage = <Game />;
  const SettingsPage = <Settings />;
  return (
    <ul className="text-[22px] uppercase text-white flex flex-col items-center gap-6 mb-20 font-semibold tracking-wide">
      <Button onClick={() => setPage(GamePage)}>play</Button>
      <Button onClick={() => setPage(SettingsPage)}>settings</Button>
    </ul>
  );
};

export default HomeMenu;
