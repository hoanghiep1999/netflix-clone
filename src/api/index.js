import axios from 'axios';
import { BASE_URL, API_KEY } from './config';

export const getDataTMDB = {
  top_rated: async (type) => {
    const res = await axios.get(`${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    return res.data;
  },
  popular: async (type, pageNum) => {
    const data = [];
    for (let i = 1; i <= pageNum; i++) {
      const res = await axios.get(`${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US&page=${i}`);
      data.push(...res.data.results)
    }
    return data;
  },
  upcoming: async (type) => {
    const res = await axios.get(`${BASE_URL}/${type}/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
    return res.data;
  },
  top_ratedTV: async () => {
    const res = await axios.get(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    return res.data;
  },
  lastest: async () => {
    const res = await axios.get(`${BASE_URL}/movie/latest?api_key=${API_KEY}&language=en-US`);
    return res.data;
  },
  genres: async (type) => {
    const res = await axios.get(`${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=en-US`);
    return res.data;
  },
  details: async (type, id) => {
    const res = await axios.get(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`);
    return res.data;
  },
  TV_season_details: async (id, seasonNumber) => {
    const res = await axios.get(`${BASE_URL}/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`);
    return res.data;
  },
  TV_episode_details: async (id, seasonNumber, episodeNumber) => {
    const res = await axios.get(`${BASE_URL}/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${API_KEY}&language=en-US`);
    return res.data;
  },
  credits: async (type, id) => {
    const res = await axios.get(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`);
    return res.data;
  },
  reviews: async (type, id) => {
    const res = await axios.get(`${BASE_URL}/${type}/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
    return res.data;
  },
  recommendations: async (type, id) => {
    const res = await axios.get(`${BASE_URL}/${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`);
    return res.data;
  },
  similars: async (type, id) => {
    const res = await axios.get(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
    return res.data;
  },
}