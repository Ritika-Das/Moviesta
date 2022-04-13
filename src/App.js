import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const trendingAPI = "https://api.themoviedb.org/3/trending/all/day?api_key=2b3e4dbde352413574c4a8e8aec55198";
const searchAPI = "https://api.themoviedb.org/3/search/movie?api_key=2b3e4dbde352413574c4a8e8aec55198&page=1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(trendingAPI)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setMovies(data.results);
    })
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    fetch(searchAPI + searchTerm)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setMovies(data.results);
    })
};

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input 
            className="search" 
            type="text" 
            placeholder="Search ..."
            value={searchTerm}
            onChange={handleOnChange} />
        </form>
      </header>
      
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

export default App;