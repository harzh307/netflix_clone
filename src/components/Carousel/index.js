import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../../axios";
import movieTrailer from "movie-trailer";
import "./Carousel.css";

const Carusel = ({ title, fetchUrl, isLargeRow }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
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

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.original_name || movie?.title || movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          console.log(urlParams, movie?.name, "<url found");
        })
        .catch((err) => {
          setTrailerUrl("No Url available");
          console.log(err, trailerUrl, "<no url found");
        });
    }
  };
  console.log(trailerUrl);

  return (
    <div className="row_posters">
      <h2>{title}</h2>
      <div className="row_div">
        {movies.map((movie) => (
          // <div
          //   style={{
          //     backgroundImage: `url(${base_url}${
          //   //    !isLargeRow ? movie?.backdrop_path : movie?.poster_path
          //     })`,
          //     height: 300,
          //     width: 500,
          //     backgroundSize: "cover",
          //     backgroundPosition: "center",
          //   }}
          //   className={` object-contain transition ${
          //     isLargeRow && "max-h-60"
          //   } duration-300 ease-in-out hover:z-10 transform gap-5 hover:scale-110`}
          // >
          //   <h2>{movie?.original_name || movie?.title || movie?.name}</h2>
          // </div>
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${base_url}${
              !isLargeRow ? movie?.backdrop_path : movie?.poster_path
            }`}
            className={`max-h-36 object-contain transition ${
              isLargeRow && "max-h-60"
            } duration-300 ease-in-out hover:z-10 transform gap-5 hover:scale-110`}
            alt={movie.name}
            // dangerouslySetInnerHTML={{
            //   __html: "Movie Name",
            // }}
          />
        ))}
      </div>
      {trailerUrl === "No Url available" ? (
        <h2>{trailerUrl}</h2>
      ) : (
        trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />
      )}
    </div>
  );
};

export default Carusel;
