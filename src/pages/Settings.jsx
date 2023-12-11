import React, { useContext } from "react";
import ConfigPanel from "../components/ConfigPanel";
import Template from "../components/Template";
import { CurrentPageContext } from "../contexts/CurrentPageContext";
import Home from "./Home";

const Settings = () => {
  const { setPage } = useContext(CurrentPageContext);
  const HomePage = <Home />;
  return (
    <Template className="flex flex-col justify-between items-center">
      <h1 className="text-[35px] text-white font-medium text-center mt-10">
        Settings
      </h1>
      <ConfigPanel />
      <h3
        className="hover:text-orange-500 cursor-pointer text-center text-xl mb-10 uppercase"
        onClick={() => setPage(HomePage)}
      >
        back to title
      </h3>
    </Template>
  );
};

export default Settings;
