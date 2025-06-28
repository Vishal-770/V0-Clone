import Loader from "@/components/Loader";
import React from "react";

const LoadingPage = () => {
  return (
    <div className=" h-[80vh] flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default LoadingPage;
