import React from "react";
import '../assets/css/Banner.css';
import {Link} from 'react-router-dom';

import { IMAGE_URL }from '../api/config';

const Banner = ({item, genresArray}) => {
  return (
    <div className="banner">
      <img src={`${IMAGE_URL}${(item.backdrop_path || item.poster_path || "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")}`} alt="" />
      <div className="banner-info">
        <div className="grid-layout-container">
          <div className="banner-info-wrap">
            <span className="banner-info-name">{item.title}</span>
            <ul>
              <li className="time">{item.release_date.split("-").reverse().join("-")} </li>
              <li className="point">{item.vote_average}</li>
              <li>TMDB</li>
            </ul>
            <div className="banner-info-description">{item.overview}</div>
            <div className="banner-button-wrap">
              <Link to={`/watch-movie/movie/${item.title.replace(/\s/g, '').replaceAll('?', '')}-${item.id}/s=full&e=full`} className="banner-button"><div></div><span>Play</span></Link>
              <Link to={`/detail/movie/${item.title.replace(/\s/g, '').replaceAll('?', '')}-${item.id}`} className="banner-button">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z"></path>
                  <path d="M11 11H13V17H11zM11 7H13V9H11z"></path>
                </svg>
                <span>More info</span>
              </Link>
            </div>
            {item.homepage === '' ? <span className="banner-info-homepage">Homepage: ???</span> : <span className="banner-info-homepage">Homepage: <a href={item.homepage}>{item.homepage}</a></span>}
            <span className="banner-info-genres">Genres: {genresArray.map((genre, index) => {
              if (index !== genresArray.length - 1) 
                return genre.name + ", ";
              else 
                return genre.name;
            })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;