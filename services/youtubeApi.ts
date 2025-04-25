import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideos = async (query: string, maxResults = 10) => {
  const url = `${BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(
    query
  )}&maxResults=${maxResults}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.items || [];
};
