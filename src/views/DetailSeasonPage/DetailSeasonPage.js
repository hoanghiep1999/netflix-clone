import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import Loading from '../../components/Loading';
import './DetailSeasonPage.css';

import {Link, useParams} from 'react-router-dom';

import { IMAGE_URL } from '../../api/config';
import { getDataTMDB } from '../../api/index';

const DetailSeasonPage = () => {
  const param = useParams();
  const [data, setData] = useState();
  const [seasonData, setSeasonData] = useState();

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const detailRes = await getDataTMDB.details(param.type, param.id);
      setData(detailRes);
      const seasonDetailRes = await getDataTMDB.TV_season_details(param.id, param.season);
      setSeasonData(seasonDetailRes);
      setLoading(false);
    }

    fetchData();
  }, [param]);

  if(loading) return <Loading />
  else
    return (
      <>
        <div className="grid-layout">
          <Header />
        </div>
        <div className="detail-season-top">
          <div className="grid-layout-page">
            <div className="detail-season-info">
              <img src={(seasonData && seasonData.poster_path) ? `${IMAGE_URL}/${seasonData.poster_path}` : "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"} alt="" />
              <div>
                <div className="detail-info-wrap detail-season-wrap">
                  <span className="detail-info-name">{data && data.name} <span style={{paddingLeft: "6px"}}>(Season {param.season})</span></span>
                  <ul>
                    <li className="time">{(seasonData && seasonData.air_date === '') ? <span style={{fontSize: "20px"}}>...</span> : (seasonData && seasonData.air_date.split("-").reverse().join("-"))} (US)</li>
                    <li className="point">{data && data.vote_average}</li>
                    <li className="tmdb">TMDB</li>
                    <li>
                      {data && data.genres.map((item, index) => {
                        if(index !== data.genres.length - 1)
                          return item.name + ', ';
                        else 
                          return item.name;
                        })}
                    </li>
                  </ul>
                </div> 
                <div className="detail-season-overview">
                  {seasonData && (seasonData.overview || <span style={{fontSize: "20px"}}>...</span>)}
                </div>
                <Link to={`/detail/${param.type}/${(data && data.title && data.title.replace(/\s/g, '').replaceAll('?', '')) || (data && data.name && data.name.replace(/\s/g, '').replaceAll('?', ''))}-${data && data.id}`}>Back to detail page</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-season-bottom">
          <div className="grid-layout-page">
            <div className="container">
              <ul className="episode-list">
                <div className="episode-label">Total Episode <span>{seasonData && seasonData.episodes.length}</span></div>
                {
                  seasonData && seasonData.episodes.map((item, index) => {
                    return (
                      <li className="episode-item" key={item.id}>
                        <Link to={`/watch-movie/${param.type}/${param.title}-${param.id}/s=${param.season}&e=${index + 1}`} style={
                          item.still_path ?
                          {
                            backgroundImage: `url(${IMAGE_URL}/${item.still_path})`,
                          } : 
                          {
                            backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                          }
                        } />
                        <div className="episode-info">
                          <Link to={`/watch-movie/${param.type}/${param.title}-${param.id}/s=${param.season}&e=${index + 1}`} title={item.name}>{item.name}</Link>
                          <span className="episode-info-overview" title={item.overview}>{item.overview || <span style={{fontSize: "20px"}}>...</span>}</span>
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
}

export default DetailSeasonPage;
