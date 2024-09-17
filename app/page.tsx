import React from "react";
import Top from "./_components/Top";
import UnderGround from "./_components/UnderGround";

const page = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 z-20">
        <Top />
      </div>
      <UnderGround />
    </div>
  );
};

export default page;
