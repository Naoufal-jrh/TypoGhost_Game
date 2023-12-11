import React, { useRef, useEffect } from "react";
import p5 from "p5";
import { drawFun, keyPressedFun, setUpFun, preLoadFun } from "../utils/p5Utils";
import { CurrentPageContext } from "../contexts/CurrentPageContext";
import GameOver from "../pages/GameOver";
import { useContext } from "react";
const Canvas = () => {
  const { setPage } = useContext(CurrentPageContext);
  const GameOverPage = <GameOver />;
  //____________________________________________________________
  const myref = useRef(null);
  let height, width;
  useEffect(() => {
    const Sketch = (p) => {
      p.preload = () => {
        preLoadFun(p);
      };
      p.setup = () => {
        height = p.windowHeight;
        width = myref.current.offsetWidth + 1;
        p.createCanvas(width, height);
        setUpFun(p);
      };
      p.keyPressed = () => {
        keyPressedFun(p, p.key);
      };
      p.windowResized = () => {
        height = p.windowHeight;
        width = myref.current.offsetWidth;
        p.resizeCanvas(width, height);
      };
      p.draw = () => {
        drawFun(p, setPage, GameOverPage);
      };
    };

    const myP5 = new p5(Sketch, myref.current);

    return () => {
      // Cleanup the p5 instance when the component unmounts
      myP5.remove();
    };
  }, []);

  return <div ref={myref} className="w-full h-full" />;
};

export default Canvas;
