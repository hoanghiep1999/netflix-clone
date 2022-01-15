import ScrollToTop from './components/ScrollToTop';
import FixedButton from './components/FixedButton';

import HomePage from './views/HomePage/HomePage';
import DetailPage from './views/DetailPage/DetailPage';
import DetailSeasonPage from './views/DetailSeasonPage/DetailSeasonPage';
import GenrePage from './views/GenrePage/GenrePage';
import SearchPage from './views/SearchPage/SearchPage';
import WatchMoviePage from './views/WatchMoviePage/WatchMoviePage';
import LastestAddedPage from './views/LastestAddedPage/LastestAddedPage';

import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes> 
        <Route path="/" exact element={<HomePage />} />
        <Route path="/detail/:type/:title-:id" exact element={<DetailPage />} />
        <Route path="/detail/:type/:title-:id/season=:season" exact element={<DetailSeasonPage />} />
        <Route path="/genre/:type/:id" exact element={<GenrePage />} />
        <Route path="/search/:keyword" exact element={<SearchPage />} />
        <Route path="/watch-movie/:type/:title-:id/s=:s&e=:e" exact element={<WatchMoviePage />} />
        <Route path="/lastest-added" exact element={<LastestAddedPage />} />
      </Routes>

      <FixedButton />
    </>
  );
}

export default App;
