import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import Loading from '../../components/Loading';
/* Css cua trang giong trang GenrePage */
import './SearchPage.css';

import { IMAGE_URL } from '../../api/config';
import { getDataTMDB } from '../../api/index';

import {Link, useParams} from 'react-router-dom';

const SearchPage = () => {
  const param = useParams();
  const [dataMovies, setDataMovies] = useState([]);
  const [dataTVShows, setDataTVShows] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dataMovies = [];
      const dataTVShows = [];
      const popularRes = await getDataTMDB.popular('movie', 5);
      popularRes.forEach(item => {
        /* dua keyword ve dang chu in thuong de so sanh */
        if(item.title.toLowerCase().includes(param.keyword.toLowerCase()))
          dataMovies.push(item);
      });
      const popularTVRes = await getDataTMDB.popular('tv', 5);
      popularTVRes.forEach(item => {
        /* dua keyword ve dang chu in thuong de so sanh */
        if(item.name.toLowerCase().includes(param.keyword.toLowerCase()))
          dataTVShows.push(item);
      });
      setDataMovies([...dataMovies]);
      setDataTVShows([...dataTVShows]);
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

        <div className="genre-page">
          <div className="grid-layout-page">
            <span className="genre-label">Search key: <span style={{fontSize: "20px"}}>{param.keyword}</span></span>
            <div className="search-label">Movies</div>
            { 
              dataMovies.length === 0 && <div className="search-no-result">There are no results !</div>
            } 
            <ul className="genre-list">  
            {
              dataMovies.map(item => {
                return (
                  <li key={item.id}>
                    <Link to={`/detail/movie/${item.title.replace(/\s/g, '').replaceAll('?', '')}-${item.id}`}
                      style={(item.backdrop_path || item.poster_path) ? {
                        backgroundImage: `url(${IMAGE_URL}/${item.backdrop_path || item.poster_path})`,
                      } : {
                        backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                      }}>
                      <div>{item.title}</div>
                    </Link>
                  </li>
                );
              })
            }
            </ul>
            <div className="search-label">TV Shows</div>
            { 
              dataTVShows.length === 0 && <div className="search-no-result">There are no results !</div>
            } 
            <ul className="genre-list"> 
            {
              dataTVShows.map(item => {
                return (
                  <li key={item.id}>
                    <Link to={`/detail/tv/${item.name.replace(/\s/g, '').replaceAll('?', '')}-${item.id}`}
                      style={(item.backdrop_path || item.poster_path) ? {
                        backgroundImage: `url(${IMAGE_URL}/${item.backdrop_path || item.poster_path})`,
                      } : {
                        backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                      }}>
                      <div>{item.name}</div>
                    </Link>
                  </li>
                );
              })
            }
            </ul>
          </div>
        </div>
        
        <Footer />
      </>
    );
}

export default SearchPage;
