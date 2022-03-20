import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./Carousel.css";

const Carusel = ({ title, fetchUrl, isLargeRow }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    };
    fetchData();
    return () => {};
  }, [fetchUrl]);
  console.log(movies);
  return (
    <div className="row_posters">
      <h2>{title}</h2>
      <div className="row_div">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${base_url}${
              !isLargeRow ? movie?.backdrop_path : movie?.poster_path
            }`}
            className={`max-h-36 object-contain transition ${
              isLargeRow && "max-h-60"
            } duration-300 ease-in-out hover:z-10 transform gap-5 hover:scale-110`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Carusel;
