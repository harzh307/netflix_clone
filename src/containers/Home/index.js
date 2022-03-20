import React from "react";
import Banner from "../../components/Banner";
import Carusel from "../../components/Carousel";
import NavBar from "../../components/NavBar";
import request from "../../requests";
import "./home.css";

const Home = () => {
  return (
    <div className="main">
      <NavBar />
      <Banner />
      <div className="absolute bg-transparent top-2/4">
        <Carusel
          isLargeRow
          title="NETFLIX ORIGINALS"
          fetchUrl={request.fetchNetflixOriginals}
        />
        <Carusel title="Trending Now" fetchUrl={request.fetchTrending} />
        <Carusel title="Top Rated" fetchUrl={request.fetchTopRated} />
        <Carusel title="Action Movies" fetchUrl={request.fetchActionMovies} />
        <Carusel title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
        <Carusel title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
        <Carusel title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
        <Carusel title="Documentaries" fetchUrl={request.fetchDocumentaries} />
      </div>
      {/* </NavBar> */}
    </div>
  );
};

export default Home;
