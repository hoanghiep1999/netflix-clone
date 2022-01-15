import { useEffect, useState, useCallback, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import Loading from '../../components/Loading';
import './GenrePage.css';

import { IMAGE_URL } from '../../api/config';
import { getDataTMDB } from '../../api/index';

import { Link, useParams, useLocation } from 'react-router-dom';

const GenrePage = () => {
  const param = useParams();
  const { pathname } = useLocation();

  const [data, setData] = useState([]);
  const [genre, setGenre] = useState();
  /* Show more data button */
  const [moreData, setMoreData] = useState(1);

  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = [];
    const popularRes = await getDataTMDB.popular(param.type, 5);
    popularRes.forEach(item => {
      item.genre_ids.forEach(genre => {
        if(genre === parseInt(param.id)) {
          data.push(item);
        }
      })
    });
    setData([...data]);
    const genresRes = await getDataTMDB.genres(param.type);
    const genreData = genresRes.genres.find(genre => genre.id === parseInt(param.id));
    setGenre({...genreData});
    setLoading(false);
  }, [param]);

  useEffect(() => fetchData(), [param, fetchData]);

  useEffect(() => {
    setMoreData(1);
  }, [pathname]);

  /* Lay so lan xuat hien cua Show more data button */
  const num = useMemo(() => {
    return Math.ceil(data.length / 16);
  }, [data]);

  if(loading) return <Loading />
  else
    return (
      <>
        <div className="grid-layout">
          <Header />
        </div>

        <div className="genre-page">
          <div className="grid-layout-page">
            <span className="genre-label">{genre && genre.name}</span>
            <ul className="genre-list">
              {
                data.slice(0, 16 * moreData).map(item => {
                  return (
                    <li key={item.id}>
                      <Link to={`/detail/${param.type}/${(item.title && item.title.replace(/\s/g, '').replaceAll('?', '')) || (item.name && item.name.replace(/\s/g, '').replaceAll('?', ''))}-${item.id}`}
                        style={(item.backdrop_path || item.poster_path) ? {
                          backgroundImage: `url(${IMAGE_URL}/${item.backdrop_path || item.poster_path})`,
                        } : {
                          backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                        }}>
                        <div>{item.title || item.name}</div>
                      </Link>
                    </li>
                  );
                })
              }
            </ul>
            {
              data.length >= 16 && moreData < num && <button type="button" className="show-more-btn" onClick={() => setMoreData(moreData + 1)}>Show more</button>
            } 
          </div>
        </div>
        
        <Footer />
      </>
    );
}

export default GenrePage;
