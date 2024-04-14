import React from "react";

import dynamic from "next/dynamic";
const Home = dynamic(() => import("./pages/HomePage"), {
  ssr: false,
});

const page = () => {
  return <Home />;
};

export default page;
