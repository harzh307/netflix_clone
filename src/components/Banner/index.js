import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "../../axios";
import request from "../../requests";

const Banner = ({ children }) => {
  const [movie, setMovie] = useState([]);
  const [scrollPos, setScrollPos] = useState(0);
  useLayoutEffect(() => {
    document.addEventListener("scroll", function (e) {
      setScrollPos(window.scrollY);
    });
    return () => {};
  }, [scrollPos]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(request.fetchNetflixOriginals);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return response;
    };
    fetchData();
    return () => {};
  }, []);
  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <header
      className={`text-white object-contain h-screen fixed bg-transparent w-full`}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
        backgroundPosition: "center",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        className={`fixed h-screen w-screen transform duration-300 bg-black opacity-0 ${
          scrollPos > 200 && "opacity-80"
        } `}
      />
      {/*
       */}
      <div
        className={`p-10 pt-20 font-bold transform duration-300 h-4/6 flex flex-col justify-evenly
        ${scrollPos > 150 && "opacity-0"}`}
      >
        <h1 className="text-6xl font-bold">
          {movie?.original_name || movie?.title || movie?.name}
        </h1>
        {/* bg image */}
        <h2 className="font-semibold text-xl max-w-4xl leading-8 truncate">
          {movie?.overview}
        </h2>
        <div>
          <button
            style={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "5px",
              fontWeight: "bold",
              padding: "5px 25px",
            }}
          >
            Play
          </button>
          <button
            style={{
              backgroundColor: "#999",
              opacity: 0.8,
              padding: "5px 25px",
              borderRadius: "5px",
              marginLeft: "5px",
            }}
          >
            More Info
          </button>
        </div>
        {/* title */}
        {/* div > 2 buttons */}
        {/* description */}
      </div>
      {children}
    </header>
  );
};

export default Banner;
