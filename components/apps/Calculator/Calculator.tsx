"use client";

import React, { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  
  const buttons = [
    ["C", "±", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const handleAction = (val: string) => {
    if (val === "C") setDisplay("0");
    else if (val === "=") {
      try { setDisplay(eval(display).toString()); } catch { setDisplay("Error"); }
    } else {
      setDisplay(display === "0" ? val : display + val);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1c1c1c] text-white p-2 select-none">
      <div className="flex-1 flex items-end justify-end px-4 py-6 text-5xl font-light overflow-hidden">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {buttons.flat().map((btn) => (
          <button
            key={btn}
            onClick={() => handleAction(btn)}
            className={`h-14 rounded-full text-xl transition-colors
              ${btn === "0" ? "col-span-2 px-6 text-left" : ""}
              ${["/", "*", "-", "+", "="].includes(btn) ? "bg-orange-500 hover:bg-orange-400" : "bg-[#333] hover:bg-[#444]"}
              ${["C", "±", "%"].includes(btn) ? "bg-[#a5a5a5] text-black hover:bg-[#d4d4d4]" : ""}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}