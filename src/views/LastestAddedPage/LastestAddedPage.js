import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import '../WatchMoviePage/WatchMoviePage.css';

import {Link, useParams} from 'react-router-dom';

import { IMAGE_URL } from '../../api/config';
import { getDataTMDB } from '../../api/index';

const LastestAddedPage = () => {
  const param = useParams();
  const [data, setData] = useState();

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const lastestRes = await getDataTMDB.lastest();
      setData(lastestRes);
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
            <span className="genre-label">Recently Added</span>
            <ul className="genre-list">
              { data && <li key={data && data.id}>
                <Link to={`/detail/movie/${data.title.replace(/\s/g, '').replaceAll('?', '')}-${data.id}`}
                  style={(data.backdrop_path || data.poster_path) ? {
                    backgroundImage: `url(${IMAGE_URL}/${data.backdrop_path || data.poster_path})`,
                  } : {
                    backgroundImage: 'url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")',
                  }}>
                  <div>{data.title}</div>
                </Link>
              </li>
              }
            </ul>
          </div>
        </div>
        
        <Footer />
      </>
    );
}

export default LastestAddedPage;