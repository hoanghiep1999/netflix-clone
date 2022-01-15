import React, { useState, useEffect } from 'react';
import BannerList from '../../components/BannerList';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import {Link} from 'react-router-dom';

import { IMAGE_URL }from '../../api/config';
import { getDataTMDB } from '../../api/index';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'

// HomePage css
import './HomePage.css';

// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation]);

function App() {
  const [data, setData] = useState([]);
  const [genresMovie, setGenresMovie] = useState();
  /* State cho cac genres hien thi tren trang chu */
  const [genresMovieHome, setGenresMovieHome] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = [];
      const topRatedRes = await getDataTMDB.top_rated('movie');
      data.push(topRatedRes);
      const popularRes = await getDataTMDB.popular('movie', 5);
      data.push(popularRes);
      const upcomingRes = await getDataTMDB.upcoming('movie');
      data.push(upcomingRes);
      const topRatedTVRes = await getDataTMDB.top_ratedTV();
      data.push(topRatedTVRes);
      setData([...data]);

      const genresRes = await getDataTMDB.genres('movie');
      setGenresMovie(genresRes);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const data = [];
    genresMovie && (genresMovie.genres || []).forEach(item => {
      if(item.name === 'Action' || item.name === 'Adventure' || item.name === 'Drama' || item.name === 'Romance' || item.name === 'Horror')
        data.push(item);
    });
    setGenresMovieHome(data);
  }, [genresMovie]);

  if (loading) return <Loading />
  else
    return (
      <>
        <div className="grid-layout">
          <Header />
        </div>

        <BannerList />
        <div className="grid-layout-container">
          <ul className="main-list">
            <li className="main-item main-first-item">
              <div className="main-item-head">
                <div>Top Rated On Netflix</div>
              </div>
              <ul className="main-item-body">
                <Swiper navigation={true} slidesPerView={4} spaceBetween={10} breakpoints={
                  {
                    "320": {
                      "slidesPerView": 3,
                      "spaceBetween": 10
                    },
                    "576": {
                      "slidesPerView": 4,
                      "spaceBetween": 10
                    },
                    "768": {
                      "slidesPerView": 4,
                      "spaceBetween": 15
                    },
                    "876": {
                      "slidesPerView": 5,
                      "spaceBetween": 10
                    },
                    "1024": {
                      "slidesPerView": 4,
                      "spaceBetween": 10
                    },
                }}
                  className="mySwiper mainSwiper">
                  {
                    /* data[0] = top rated object */
                    typeof data[0] !== 'undefined' && data[0].results.slice(0,10).map(item => {
                      return (
                        <SwiperSlide key={item.id}>
                          <li>
                            <Link to={`/detail/movie/${item.title.replace(/\s/g, '').replaceAll('?', '')}-${item.id}`} 
                              style={(item.backdrop_path || item.poster_path) ? {
                                backgroundImage: `url(${IMAGE_URL}/${item.backdrop_path || item.details.poster_path})`,
                              } : {
                                backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                              }}>
                              <div>{item.title}</div>
                            </Link>
                          </li>
                        </SwiperSlide>
                      );
                    })
                  }
                </Swiper>
              </ul>
            </li>

            <li className="main-item">
              <div className="main-item-head">
                <div>What's Popular</div>
              </div>
              <ul className="main-item-body">
                <Swiper slidesPerView={4} spaceBetween={10} navigation={true} breakpoints={
                  {
                    "320": {
                      "slidesPerView": 3,
                      "spaceBetween": 10
                    },
                    "576": {
                      "slidesPerView": 4,
                      "spaceBetween": 10
                    },
                    "768": {
                      "slidesPerView": 4,
                      "spaceBetween": 15
                    },
                    "876": {
                      "slidesPerView": 5,
                      "spaceBetween": 10
                    },
                    "1024": {
                      "slidesPerView": 4,
                      "spaceBetween": 10
                    },
                }} className="mySwiper mainSwiper">
                {
                  /* data[1] = popular array */
                  typeof data[1] !== 'undefined' && data[1].slice(0,10).map(item => {
                    return (
                      <SwiperSlide key={item.id}>
                        <li>
                          <Link to={`/detail/movie/${item.title.replace(/\s/g, '').replaceAll('?', '')}-${item.id}`} 
                            style={(item.backdrop_path || item.poster_path) ? {
                              backgroundImage: `url(${IMAGE_URL}/${item.backdrop_path || item.details.poster_path})`,
                            } : {
                              backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                            }}>
                            <div>{item.title}</div>
                          </Link>
                        </li>
                      </SwiperSlide>
                    );
                  })
                }
                </Swiper>
              </ul>
            </li>

            <li className="main-item">
              <div className="main-item-head">
                <div>Upcoming Movies In Theatres</div>
              </div>
              <ul className="main-item-body">
                <Swiper slidesPerView={4} spaceBetween={10} navigation={true} breakpoints={
                  {
                    "320": {
                      "slidesPerView": 3,
                      "spaceBetween": 10
                    },
                    "576": {
                      "slidesPerView": 4,
                      "spaceBetween": 10
                    },
                    "768": {
                      "slidesPerView": 4,
                      "spaceBetween": 15
                    },
                    "876": {
                      "slidesPerView": 5,
                      "spaceBetween": 10
                    },
                    "1024": {
                      "slidesPerView": 4,
                      "spaceBetween": 10
                    },
                }} className="mySwiper mainSwiper">
                {
                  /* data[2] = upcoming object */
                  typeof data[2] !== 'undefined' && data[2].results.slice(0,10).map(item => {
                    const genresArray = [];
                    typeof genresMovie !== 'undefined' && genresMovie.genres.forEach(genre => {
                      (item.genre_ids || []).forEach(genreId => {
                        if(genreId === genre.id) 
                          genresArray.push(genre);
                      })
                    });
                    return (
                      <SwiperSlide key={item.id}>
                        <li className="upcoming">
                          <Link to={`/detail/movie/${item.title.replace(/\s/g, '').replaceAll('?', '')}-${item.id}`} 
                            style={(item.backdrop_path || item.poster_path) ? {
                              backgroundImage: `url(${IMAGE_URL}/${item.backdrop_path || item.details.poster_path})`,
                            } : {
                              backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                            }}>
                            <div>{item.title}<span>{genresArray.map((genre, index) => {
                              if (index !== genresArray.length - 1) 
                                return genre.name + ", ";
                              else 
                                return genre.name;
                            })}</span></div>
                          </Link>
                        </li>
                      </SwiperSlide>
                    );
                  })
                }
                </Swiper>
              </ul>
            </li>

            {
              genresMovieHome && genresMovieHome.map(genre => {
                return (
                  <li className="main-item" key={genre.id}>
                    <div className="main-item-head">
                      <Link to={`/genre/movie/${genre.id}`}>{genre.name}</Link>
                      <Link to={`/genre/movie/${genre.id}`}>
                        Show all
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </Link>
                    </div>
                    <ul className="main-item-body">
                      <Swiper slidesPerView={4} spaceBetween={10} navigation={true} breakpoints={
                  {
                    "320": {
                      "slidesPerView": 3,
                      "spaceBetween": 10
                    },
                    "576": {
                      "slidesPerView": 4,
                      "spaceBetween": 10
                    },
                    "768": {
                      "slidesPerView": 4,
                      "spaceBetween": 15
                    },
                    "876": {
                      "slidesPerView": 5,
                      "spaceBetween": 10
                    },
                    "1024": {
                      "slidesPerView": 4,
                      "spaceBetween": 10
                    },
                }} className="mySwiper mainSwiper">
                      {
                        /* data[1] = popular array with genre */
                        typeof data[1] !== 'undefined' && data[1].map(item => {
                          const check = item.genre_ids.some(id => id === genre.id);
                          if (check) {
                            return (
                              <SwiperSlide key={item.id}>
                                <li>
                                  <Link to={`/detail/movie/${item.title.replace(/\s/g, '').replaceAll('?', '')}-${item.id}`} 
                                    style={(item.backdrop_path || item.poster_path) ? {
                                      backgroundImage: `url(${IMAGE_URL}/${item.backdrop_path || item.details.poster_path})`,
                                    } : {
                                      backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                                    }}>
                                    <div>{item.title}</div>
                                  </Link>
                                </li>
                              </SwiperSlide>
                            );
                          }
                          else
                            return null;
                        })
                      }
                      </Swiper>
                    </ul>
                  </li>
                );
              })
            }

            <li className="main-item">
              <div className="main-item-head">
                <Link to="/genre/tv/top_rated">Top rated TV Shows</Link>
                <Link to="/genre/tv/top_rated">
                  Show all
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </div>
              <ul className="main-item-body">
                <Swiper slidesPerView={4} spaceBetween={10} navigation={true} breakpoints={
                  {
                    "320": {
                      "slidesPerView": 3,
                      "spaceBetween": 10
                    },
                    "576": {
                      "slidesPerView": 4,
                      "spaceBetween": 10
                    },
                    "768": {
                      "slidesPerView": 4,
                      "spaceBetween": 15
                    },
                    "876": {
                      "slidesPerView": 5,
                      "spaceBetween": 10
                    },
                    "1024": {
                      "slidesPerView": 4,
                      "spaceBetween": 10
                    },
                }} className="mySwiper mainSwiper">
                {
                  /* data[3] = top rated tv */
                  typeof data[3] !== 'undefined' && data[3].results.slice(0,10).map(item => {
                    return (
                      <SwiperSlide key={item.id}>
                        <li>
                          <Link to={`/detail/tv/${item.name.replace(/\s/g, '').replaceAll('?', '')}-${item.id}`} 
                            style={(item.backdrop_path || item.poster_path) ? {
                              backgroundImage: `url(${IMAGE_URL}/${item.backdrop_path || item.poster_path})`,
                            } : {
                              backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                            }}>
                            <div>{item.name}</div>
                          </Link>
                        </li>
                      </SwiperSlide>
                    );
                  })
                }
                </Swiper>
              </ul>
            </li>
          </ul>
        </div>

        <Footer />
      </>
    );
  }

export default App;
