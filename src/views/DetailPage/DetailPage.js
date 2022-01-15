import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import Loading from '../../components/Loading';
import './DetailPage.css';

import {Link, useParams} from 'react-router-dom';

import { IMAGE_URL } from '../../api/config';
import { getDataTMDB } from '../../api/index';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'

// Icon styles
import '../../assets/css/SwiperIcon.css';

// import Swiper core and required modules
import SwiperCore, { Navigation, Scrollbar } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Scrollbar]);

const DetailPage = () => {
  const param = useParams();
  const [data, setData] = useState();
  /* All season of tv shows */
  const [seasonData, setSeasonData] = useState();

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allData = {};
      const detailRes = await getDataTMDB.details(param.type, param.id);
      const creditRes = await getDataTMDB.credits(param.type, param.id);
      const reviewRes = await getDataTMDB.reviews(param.type, param.id);
      const recommendationRes = await getDataTMDB.recommendations(param.type, param.id);
      const similarRes = await getDataTMDB.similars(param.type, param.id);
      allData.details = detailRes;
      allData.credits = creditRes;
      allData.reviews = reviewRes;
      allData.recommendations = recommendationRes;
      allData.similars = similarRes;
      setData(allData);
      setLoading(false);
    }

    fetchData();
  }, [param]);

  useEffect(() => {
    const fetchData = async () => {
      const seasonData = [];
      for (let i = 1; i <= (data && data.details.number_of_seasons); i++) {
        const res = await getDataTMDB.TV_season_details(param.id, i);
        seasonData.push(res);
      }
      setSeasonData(seasonData);
    }

    fetchData();
  }, [param, data]);

  if(loading) return <Loading />
  else
    return (
      <>
        <div className="grid-layout">
          <Header />
        </div>
        <div className="detail-page">
          <div className="detail-info-top" style={
          (data && (data.details.backdrop_path || data.details.poster_path)) ? {
            backgroundImage: `url(${IMAGE_URL}/${data && (data.details.backdrop_path || data.details.poster_path)})`,
          } : {
            backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
          }}>
            <div className="container">
              <div className="grid-layout-page">
                <div className="detail-info-wrap">
                  <span className="detail-info-name">{data && (data.details.title || data.details.name)}</span>
                  <ul>
                    <li className="time">{data && ((data.details.release_date === '' || data.details.last_air_date === '') ? <span style={{fontSize: "20px"}}>...</span> : (data.details.release_date || data.details.last_air_date).split("-").reverse().join("-"))} (US)</li>
                    <li className="point">{data && data.details.vote_average}</li>
                    <li>TMDB</li>
                  </ul>
                </div>  
                <div className="detail-info-wrap2">
                  <div className="overview">
                    <span>Overview</span>
                    <div>{data && (data.details.overview || <span style={{fontSize: "20px"}}>...</span>)}</div>
                  </div>
                  <div className="genres">
                    <span>Genres</span>
                    <ul>
                      {data && (data.details.genres.length === 0 ? <span style={{fontSize: "20px"}}>...</span> : data.details.genres.map(genre => {
                        return (
                          <li key={genre.id}>
                            <Link to={`/genre/${param.type}/${genre.id}`}>{genre.name}</Link>
                          </li>
                        );
                      }))}
                    </ul>
                  </div>
                </div>
                <div className="video">
                  <span>Current Season / Movie</span>
                  <ul className="video-list">
                  { param.type === 'movie' ? 
                    <Swiper navigation={true} slidesPerView={3} spaceBetween={22} breakpoints={
                      {
                        "320": {
                          "slidesPerView": 3,
                          "spaceBetween": 10
                        },
                        "576": {
                          "slidesPerView": 4,
                          "spaceBetween": 10
                        },
                        "1024": {
                          "slidesPerView": 5,
                          "spaceBetween": 10
                        },
                    }} className="mySwiper mainSwiper">
                      <SwiperSlide>
                        <li className="video-item">
                          <Link to={`/watch-movie/${param.type}/${data && (data.details.title && data.details.title.replace(/\s/g, '').replaceAll('?', ''))}-${data && data.details.id}/s=full&e=full`} style={
                            (data && data.details.poster_path) ? {
                              backgroundImage: `url(${IMAGE_URL}/${data.details.poster_path})`,
                            } : {
                              backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                              backgroundSize: 'cover'
                            }}>
                            <span>Watch Movie</span>
                          </Link>
                        </li>
                      </SwiperSlide>
                    </Swiper>
                    : <Swiper navigation={true} slidesPerView={5} spaceBetween={22} breakpoints={
                        {
                          "320": {
                            "slidesPerView": 3,
                            "spaceBetween": 10
                          },
                          "576": {
                            "slidesPerView": 4,
                            "spaceBetween": 10
                          },
                          "1024": {
                            "slidesPerView": 5,
                            "spaceBetween": 10
                          },
                      }} className="mySwiper mainSwiper"> 
                        {
                          seasonData && seasonData.map((item, index) => {
                            return (
                              <SwiperSlide key={item.id}>
                                <li className="video-item">
                                  <Link to={`/detail/${param.type}/${data && data.details.name.replace(/\s/g, '').replaceAll('?', '')}-${param.id}/season=${index + 1}`} style={
                                    (item && item.poster_path) ? {
                                      backgroundImage: `url(${IMAGE_URL}/${item.poster_path})`,
                                    } : {
                                      backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                                      backgroundSize: 'cover'
                                    }}>
                                    <span>Season {index + 1}</span>
                                  </Link>
                                </li>
                              </SwiperSlide>
                            );
                          })
                        }
                      </Swiper>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-info-bottom">
            <div className="grid-layout-page">
              <div className="cast">
                <span>Cast</span>
                <ul className="cast-list">
                  {data && (data.credits.cast.length === 0 ? <div className="recommend-none-result">There are no cast yet</div> : data.credits.cast.slice(0,5).map(item => {
                    return (
                      <li className="cast-item" key={item.cast_id}>
                        <div><img src={item.profile_path !== null ? `${IMAGE_URL}/${item.profile_path}`: 
                          "data:image/png;base64,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"} alt="" /></div>
                        <div className="cast-item-info">
                          <div title={item.name}>{item.name}</div>
                          <span title={item.character}>{item.character}</span>
                        </div>
                      </li>
                    );
                  }))}
                </ul>
              </div>
              <div className="review">
                <span>Review</span>
                <ul className="review-list">
                  {data && (data.reviews.total_results === 0 ? <div className="review-none-result">There are no reviews yet</div> : data.reviews.results.slice(0,3).map(item => {
                    return (
                      <li className="review-item" key={item.id}>
                        <img src={item.author_details.avatar_path !== null ? 
                          (item.author_details.avatar_path.includes("/https://") ? `${item.author_details.avatar_path.replace("/https://","https://")}` : `${IMAGE_URL}/${item.author_details.avatar_path}`)
                          : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAATlBMVEXl5uivtLjP09SssbWrsrXk5efo6eussbazuLuwtbjg4ePm6OjHy867wMPi5OXCxsjZ3N64vL/Hys3O0dO/wsXV2NnV2dnc3uLHys7P09P1vPcdAAAHEUlEQVR4nO2d2ZrjKAxGjcHYeMVxPDX9/i/akFSWcpyUFySBm9NzMdNzk/8TaAEsJUkkEolEIpFIJBKJRCKRSCQSiUQikUgkEhZSyqrUYzpYRv2Vmb+g/k3ukEk71k0hBOc5v8Ga01BWR1ApM33qjTDBphiZqkvLpKL+iXuQle4KwV/EPVQK0aRtsJaU7dAbO73X962yOGmZZNS/dj2yrdXr0pxF8EaHZ8e2zj+szldDNjqw/Zgutd9DY1eGY0ep+zX2u0lUKfUPX0pVb9BnEU0QZpRlv3aB3slZ6r9EOW7WZ+EdtYBf2bpC7xKbklrCZ847BdoEwGuJza4lekUof8N/uyVIzMBHaiVvyBwJNIxeWjFrnAlkTFOrmePsYA8+8M/dyM6hBa278a2ckoNTCxqJPbWkCfr3SnclvPbK27SFY31W4uhTxbg/lZlBtdSy7lQphECTonqzTkvXe/Am0ZdaSoKsUYPyZZ1qx4HiAe+8MKIE8KN3iV5kbwPQGr0obKjVGTJAEzKW0xdSztO1CT192Ac1oQ87EXIXXhSSh/0eViATnLhS1MAmJK8xHNe9s5DWwpnMwQUyQRowRngTMkHpa+QZXqBZpoS+JgMqm35CeUAM70kvCgkrjL0XTQsp6LwpdLj/RlBtxArq9GIKH4iWaYWzDQk3ooTOuu9QnX/LDkkg41RFIpKjoSsSW4Xkachifom1DcmcKdw56ZScyJmmaAoZTXmBFyxMuKBRiJSVWgoahSeEAv+KEjQKEc5oblApRBOoBIXAJIkKHUKjEHGVUik8Hd7TICpkJOUT9M3hMzQRP0FUSHTsjVdbMKLaokRTSHXD1mKV+IwTfS8E+wrjh0KicxrZoCkkev2FVyAWVKeJGPejFn4mEpiUOAIJHytguRpB9mpIdjgRkfCZKVLeRvhAESer4QOdQolzN0P57gvlUJj065kWQSHlIrWJG8JOpH2ciJDWUD8wBQ/6OfHnT1UNfHkhiI5oHkDnpoLqLc0d6PsZwhdfN2AfRvGB/msE2INhD0xooj6gQOHF93mQ9/kefDFzASwm0n8w8w3UG0VPPj80VEDOxqOuAzAHNl61OIG4pOEnX9aoZXN7rw8CPWsbIV22brlA+R3JLJnjIxtvAsWD0qm3oS8pZtAOU3BRU6uZxV3g534KTKSrmOFZa5onKjcL1Qj0J5mZoov9K5XsG6BltLslepWrzbKvlQsv/G9hKge2XSNv/N2BD7b12L3oUx6cOy1jWx7OmzIUgbbT7mqNQXTYfUKO65wqZ3V4zedty/nF+k7+u9BXZDI2SzQKXtQh6ruiO8Y/X07lohmDHgAhpZ3/IGZTci6EatIkWPPdkZVOu15dJ5N8a+M5V0VT6wPI+0YmpR6HumsudF39R5fZkSbNWKrrOB3zT3WRFvLe++eQl8FHWda2bdmWBvMvrflP+3+MIatwjWmFlVqnl+3XF4Vixqdy88d6VlX0fXPu6uE/XbZJcDvSbjTjWLqmKOzMo9skJMVuhxy3D/kv/tWIbU6DLitr0QCKJytuMMHBWmt5ZmoMy1RTj6Xno7yqpBy7gq9QNtGZc3audetnlJQXdWJmNtc6zFZlzUlnnok0K7PudxxeTMl50aT+ZOOmhrBL05m8K8aU/eCHSN2JT5PV9qkshpJyU5pY/VWrBZPVdsBFk2ZUOYFs015g9E1UHcldovw6OTjBXwbn/ZBJXEtK3cxXtWAiFe5J1cqDNDcaeYd2s5+6m5izUuMZJXykPVrTlhmN4CMEt99JuNLIOsj9KEvnr2bWk7MazKu2tfPcbBO8ALpETQkc6Bs4wCjIyocF+oAz1zeNcoDKrrfCe6dm3HAdCI/9UMHRsY5cP/oWBXe7EbFr2UqUiymCWy6s8RD734fJkVrEZ3i/cyvKWqC1aNnKvqmlSC0F9rFjM7ZeRfm3bH/qt/8VHhIb/U1VOjziBWbT50PS5bNtcMSGcd5a0ZXyG1g/sbxUwSzRK2LlQsVrVOaMdXsRYnAqOKte+IcRB6csjotVGJnMDEsfwZtclPqnbmXR924ZWhc2CBa1rsPraAkAP/8usUIbywHC795GnkI2IVuwFbHG/8Dxy+fDeC1JwfhlnWI2sIbi41jP8Neo5cO4D6QWesCo96lNhThWBZSifRMVD+Bmrrw7t8GcjAOLmm/TVx3GhEyJ09wyPY4JLbNdaw9jQvam3g+5aHpBqVc/Kn2+RFvPTEzEG4SHw0tigzliDAXxNbVheAekn3mJ+mPghe8rxWSRhnqA+J5JG6YgD7k/MwmJiENx0PjRq/5YGduN5/S7Qpungoh4DvoH3IZG4el5Gx5xkf7YiOkhFbInR/P/IRU+zVCSZ+ofA8JzfXGIU8QXxGNsRHW0tPvKU1aDMYeDgPx8V/jFj8mjCm6HP+khseL+Au9ZhR/jvX4AAAAAAElFTkSuQmCC"} alt="" />
                        <div className="review-details">
                          <div className="review-name">
                            <span>A Review by <span>{item.author}</span></span>
                          </div>
                          <div className="review-time">
                            Created at: {item.created_at}
                          </div>
                          <div className="review-content">
                            {item.content}
                          </div>
                        </div>
                      </li>
                    );
                  }))}
                </ul>
              </div>
              <div className="recommendations-movie">
                <span>Recommendations Movies (TV Shows)</span>
                <ul>
                  {data && (data.recommendations.total_results === 0 ? <div className="recommend-none-result">There are no recommendations yet</div> : data.recommendations.results.slice(0,5).map(item => {
                    return (
                      <li key={item.id}>
                        <Link to={`/detail/${param.type}/${(item.title && item.title.replace(/\s/g, '').replaceAll('?', '')) || (item.name && item.name.replace(/\s/g, '').replaceAll('?', ''))}-${item.id}`} style={
                          (item.backdrop_path || item.poster_path) ? {
                            backgroundImage: `url(${IMAGE_URL}/${item.backdrop_path || item.poster_path})`,
                          } : {
                            backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                          }}>
                          <div>{item.title || item.name}</div>
                        </Link>
                      </li>
                    );
                  }))}
                </ul>
              </div>
              <div className="similar-movie">
                <span>Similar Movies (TV Shows)</span>
                <ul>
                  {data && (data.similars.results.length === 0 ? <div className="recommend-none-result">There are no similar movies yet</div> : data.similars.results.slice(0,5).map(item => {
                    return (
                      <li key={item.id}>
                        <Link to={`/detail/${param.type}/${(item.title && item.title.replace(/\s/g, '').replaceAll('?', '')) || (item.name && item.name.replace(/\s/g, '').replaceAll('?', ''))}-${item.id}`} style={
                          (item.backdrop_path || item.poster_path) ? {
                            backgroundImage: `url(${IMAGE_URL}/${item.backdrop_path || item.poster_path})`,
                          } : {
                            backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                          }}>
                          <div>{item.title || item.name}</div>
                        </Link>
                      </li>
                    );
                  }))}
                </ul>
              </div>
            </div>
          </div>
        </div>
  
        <Footer />
      </>
    );
}

export default DetailPage;
