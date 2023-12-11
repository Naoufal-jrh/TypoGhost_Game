import { useEffect, useState } from "react";
import Home from "./pages/Home";
import { CurrentPageContext } from "./contexts/CurrentPageContext";
import Canvas from "./components/Canvas";

function App() {
  const [page, setPage] = useState(<Home></Home>);

  return (
    <CurrentPageContext.Provider value={{ setPage }}>
      {page}
    </CurrentPageContext.Provider>
  );
}

export default App;
