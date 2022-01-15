import React, { useState, useEffect } from 'react';
import Banner from './Banner';

import { getDataTMDB } from '../api/index';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'

// Icon styles
import '../assets/css/SwiperIcon.css';

// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation]);

const BannerList = () => {
  const [bannerMovieData, setBannerMovieData] = useState([]);
  const [genresMovie, setGenresMovie] = useState({});

  const fetchData = async () => {
    const data = [];
    /* Top reted movie */
    const topRatedRes = await getDataTMDB.top_rated('movie');
    if (typeof topRatedRes !== 'undefined') {
      for (let item of topRatedRes.results.slice(0,5)) {
        const fetchData2 = async () => {
          const res = await getDataTMDB.details('movie', item.id);
          data.push(res);
          setBannerMovieData([...data]);
        };
  
        fetchData2();
      };
    }
    setBannerMovieData(data);
    const genresRes = await getDataTMDB.genres('movie');
    setGenresMovie(genresRes);
  };

  useEffect(() => {
    fetchData();

    /* Unmount function */
    return () => {
      setBannerMovieData([]);
      setGenresMovie({});
    };
  }, []);

  return (
    <Swiper slidesPerView={1} spaceBetween={30} loop={true} navigation={true} className="mySwiper">
      {
        typeof bannerMovieData !== 'undefined' && bannerMovieData.map(item => {
          const genresArray = [];
          typeof genresMovie.genres !== 'undefined' && genresMovie.genres.forEach(genre => {
            item.genres.forEach(genreId => {
              if(genreId.id === genre.id) 
                genresArray.push(genre);
            })
          });

          return (
            <SwiperSlide key={item.id}>
              <Banner item={item}
              genresArray={genresArray} />
            </SwiperSlide>
          );
        })
      }
    </Swiper>
  );
}

export default BannerList;