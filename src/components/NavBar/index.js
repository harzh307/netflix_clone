import React, { useLayoutEffect, useState } from "react";

const NavBar = ({ children }) => {
  const [scrollPos, setScrollPos] = useState(0);
  useLayoutEffect(() => {
    document.addEventListener("scroll", function (e) {
      setScrollPos(window.scrollY);
    });
    return () => {};
  }, [scrollPos]);

  return (
    <>
      <div
        className={`bg-transparent ${
          scrollPos > 200 && "bg-black opacity-90"
        } w-screen z-20 text-white m-auto transform duration-500 font-semibold text-sm p-6 flex row-auto items-center fixed`}
      >
        <div className="p-0 m-0 w-20 h-1/4 self-start ">
          <img
            alt="logo"
            src={require("../../assets/logo.png")}
            height="100%"
            className="cursor-pointer object-cover"
          />
        </div>
        <div className="flex  row-auto ml-8  gap-6 list-none justify-between">
          <a href="#">Home</a>
          <a href="#">TV Shows</a>
          <a href="#">Movies</a>
          <a href="#">New & Popular</a>
          <a href="#">My List</a>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
};

export default NavBar;
