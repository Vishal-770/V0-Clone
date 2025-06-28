"use client";
import React, { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const Home = () => {
  const [size, setSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.9,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <ResizableBox
        width={size.width}
        height={size.height}
        minConstraints={[300, 300]}
        maxConstraints={[size.width, size.height]}
        resizeHandles={["s", "e", "n", "w", "se", "sw", "ne", "nw"]}
      >
        <div className="h-full w-full bg-gray-200 border border-gray-400 p-4 overflow-auto">
          <h1 className="text-xl font-bold">Resizable Box (90% Viewport)</h1>
          <p>Try resizing from any edge or corner.</p>
        </div>
      </ResizableBox>
    </div>
  );
};

export default Home;
