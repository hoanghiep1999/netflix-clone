import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import './WatchMoviePage.css';

import {Link, useParams} from 'react-router-dom';

import { IMAGE_URL, VIDEO_URL, VIDEO_URL2 } from '../../api/config';
import { getDataTMDB } from '../../api/index';

const WatchMoviePage = () => {
  const param = useParams();
  const [data, setData] = useState();
  const [seasonData, setSeasonData] = useState();
  const [episodeData, setEpisodeData] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      const detailRes = await getDataTMDB.details(param.type, param.id);
      setData(detailRes);
      const seasonDetailRes = await getDataTMDB.TV_season_details(param.id, param.s);
      setSeasonData(seasonDetailRes);
      const episodeDetailRes = await getDataTMDB.TV_episode_details(param.id, param.s, param.e);
      setEpisodeData(episodeDetailRes);
    }

    fetchData();
  }, [param]);
  
  return (
    <>
      <div className="grid-layout">
        <Header />
      </div>

      <div className="watch-page">
        <div className="grid-layout-page">
          <div className="watch-label"> 
            <div>
            {
              (data && data.title) || (episodeData && episodeData.name)
            } 
            </div>
            {
              param.s !== 'full' && param.e !== 'full' && <span>(Season {param.s} Epsiode {param.e})</span>
            }
          </div>
          <div className="watch-wrap1">
            <div className="watch-main">
            {
              (param.s === 'full' && param.e === 'full')
                ? <iframe title={data && data.title} loading="lazy" src={`${VIDEO_URL}?id=${data && data.id}`} allowFullScreen="true" />
                : <iframe title={data && data.name} loading="lazy" src={`${VIDEO_URL2}?id=${data && data.id}&s=${param.s}&e=${param.e}`} allowFullScreen="true" />
            }
            </div>
            <div className="watch-others">
              <span>Release date</span>
              <ul>
              {
                (param.s === 'full' && param.e === 'full')
                  ? <li>{(data && data.release_date === '') ? <span style={{fontSize: "20px"}}>...</span> : (data && data.release_date.split("-").reverse().join("-"))} (US)</li>
                  : <li>{(episodeData && episodeData.air_date === '') ? <span style={{fontSize: "20px"}}>...</span> : (episodeData && episodeData.air_date.split("-").reverse().join("-"))} (US)</li>
              }
              </ul>
              <span>Overview</span>
              <ul>
              {
                (param.s === 'full' && param.e === 'full') 
                  ? <li className="watch-overview">{data && (data.overview || <span style={{fontSize: "20px"}}>...</span>)}</li>
                  : <li className="watch-overview">{episodeData && (episodeData.overview || <span style={{fontSize: "20px"}}>...</span>)}</li>
                }
              </ul>
              <span>Genres</span>
              <ul>
                <li>
                  {data && data.genres.map((item, index) => {
                    if (index !== data.genres.length - 1)
                      return item.name + ', ';
                    else
                      return item.name;
                    }
                  )}
                </li>
              </ul>
            </div>
          </div>
          {
            (param.s !== 'full' && param.e !== 'full') && seasonData && <div className="watch-episode">
              <span>List of Episodes</span>
              <ul className="episode-list">
                {
                  seasonData && seasonData.episodes.map((item, index) => {
                    if (index !== param.e - 1)
                      return (
                        <li className="episode-item" key={item.id}>
                          <Link to={`/watch-movie/${param.type}/${param.title}-${param.id}/s=${param.s}&e=${index + 1}`} style={
                            item.still_path ?
                            {
                              backgroundImage: `url(${IMAGE_URL}/${item.still_path})`,
                            } : 
                            {
                              backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                            }
                          } />
                          <div className="episode-info">
                            <Link to={`/watch-movie/${param.type}/${param.title}-${param.id}/s=${param.s}&e=${index + 1}`} title={item.name}>{item.name}</Link>
                            <span className="episode-info-overview" title={item.overview}>{item.overview || <span style={{fontSize: "20px"}}>...</span>}</span>
                          </div>
                        </li>
                      );
                    else
											return null;
                    }
                  )
                }
              </ul>
            </div>
          }
        </div>
      </div>

      <Footer />
    </>
  );
}

export default WatchMoviePage;
