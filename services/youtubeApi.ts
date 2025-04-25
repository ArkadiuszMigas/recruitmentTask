import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideos = async (query: string, maxResults = 10) => {
  const url = `${BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(
    query
  )}&maxResults=${maxResults}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  //console.log("data", data);
  return data.items || [];
};

export const fetchVideoDetails = async (id: string) => {
  const url = `${BASE_URL}/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  //console.log("data from API", data);
  return data.items?.[0] || null;
};