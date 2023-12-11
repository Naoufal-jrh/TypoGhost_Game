import React, { useState } from "react";

import { BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";

const PercIndecator = ({ title }) => {
  const [value, setValue] = useState(50);
  return (
    <div className="flex flex-col items-center mb-8 capitalize text-[22px] gap-2">
      <h2 className="text-white font-semibold">{title}</h2>
      <div className="flex items-center gap-2 flex-row-reverse">
        <BsPlusLg
          className="text-white cursor-pointer"
          onClick={() => {
            if (value < 100) setValue(value + 10);
          }}
        />
        <span className="aria-selected:bg-orange-500">{value}%</span>
        <AiOutlineMinus
          className="text-white cursor-pointer"
          onClick={() => {
            if (value > 0) setValue(value - 10);
          }}
        />
      </div>
    </div>
  );
};

export default PercIndecator;
