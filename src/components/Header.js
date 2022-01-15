import React, { useEffect, useState } from "react";
import logo from '../assets/svg/Netflix-Logo.wine.svg';
import '../assets/css/Header.css';
import { Link } from 'react-router-dom';
import Search from './Search';

import { getDataTMDB } from "../api/index";

const Header = () => {
  const [genresMovie, setGenresMovie] = useState();
  const [genresTVShow, setGenresTVShow] = useState();

  const [toogle, setToggle] = useState(false);

  const fetchData = async () => {
    const movieData = [];
    const tvData = [];
    const genresRes = await getDataTMDB.genres('movie');
    const genresTVRes = await getDataTMDB.genres('tv');
    genresRes && (genresRes.genres || []).forEach(item => {
      if(item.name === 'Action' || item.name === 'Adventure' || item.name === 'Drama' || item.name === 'Romance' || item.name === 'Horror')
        movieData.push(item);
    });
    genresTVRes && (genresTVRes.genres || []).forEach(item => {
      if(item.name === 'Action & Adventure' || item.name === 'Drama' || item.name === 'Family' || item.name === 'Kids' || item.name === 'Reality')
        tvData.push(item);
    });
    setGenresMovie(movieData);
    setGenresTVShow(tvData);
  };

  useEffect(() => {
    fetchData();

    /* Unmount function */
    /* Prevent memory leak */
    return () => {
      setGenresMovie({});
      setGenresTVShow({});
    }
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className="header-logo"><img src={logo} alt="" /></Link>
        <ul className={toogle ? "header-list active" : "header-list"}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <div>Movies</div>
            <ul className="header-list-child">
            {
              genresMovie && genresMovie.map(item => {
                return (
                  <li key={item.id}>
                    <Link to={`/genre/movie/${item.id}`}>{item.name}</Link>
                  </li>
                );
              })
            }
            </ul>
          </li>
          <li>
            <div>TV Shows</div>
            <ul className="header-list-child list-last-child">
            {
              genresTVShow && genresTVShow.map(item => {
                return (
                  <li key={item.id}>
                    <Link to={`/genre/tv/${item.id}`}>{item.name}</Link>
                  </li>
                );
              })
            }
            </ul>
          </li>
          <li>
            <Link to="/lastest-added">Recently Added</Link>
          </li>
          <li className="header-close-btn" onClick={() => setToggle(!toogle)}></li>
        </ul>
      </div>
      <div className="header-right">
        {/* Search component */}
        <Search />
        
        <div className="header-list-btn" onClick={() => setToggle(!toogle)}><div></div></div>
      </div>
    </div>
  );
}

export default Header;