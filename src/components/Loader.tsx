"use client";
import React from "react";

const Loader = () => {
  return (
    <div className="relative w-[112px] h-[112px] mx-auto">
      {/* Box 1 */}
      <div
        className="absolute border-[16px] border-primary bg-primary/20 rounded-sm shadow-md"
        style={{
          animation: "loader-box1 4s 1s infinite ease-in-out",
        }}
      ></div>

      {/* Box 2 */}
      <div
        className="absolute border-[16px] border-primary bg-primary/40 rounded-sm shadow-md"
        style={{
          animation: "loader-box2 4s 1s infinite ease-in-out",
        }}
      ></div>

      {/* Box 3 */}
      <div
        className="absolute border-[16px] border-primary bg-primary/70 rounded-sm shadow-md"
        style={{
          animation: "loader-box3 4s 1s infinite ease-in-out",
        }}
      ></div>
    </div>
  );
};

export default Loader;
