// url: `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=AIzaSyBAKfwdqch7EXopfS0k0EaayzTFqTe7-Ss`,
import axios from 'axios';
import { DetailChannel, DetailVideo, Video } from '../model/video';

const MAX_RESULTS = 25;
const defaultParams = {
  part: 'snippet',
  key: process.env.REACT_APP_YOUTUBE_API_KEY,
};

export async function getPopularVideos(): Promise<Video[]> {
  return await axios({
    url: `${process.env.REACT_APP_YOUTUBE_BASE_URL}/videos`,
    params: {
      ...defaultParams,
      maxResults: MAX_RESULTS,
      chart: 'mostPopular',
    },
  }).then((res) => {
    const items = res.data.items;
    return items.map((item: any) => ({
      id: item.id,
      publishedAt: new Date(item.snippet.publishedAt),
      channelTitle: item.snippet.channelTitle,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
  });
}

export async function getSearchVideos(keyword: string): Promise<Video[]> {
  return await axios({
    url: `${process.env.REACT_APP_YOUTUBE_BASE_URL}/search`,
    params: {
      ...defaultParams,
      maxResults: MAX_RESULTS,
      q: keyword,
    },
    method: 'GET',
  }).then((res) => {
    const items = res.data.items;
    return items.map((item: any) => ({
      id: item.id.videoId,
      publishedAt: new Date(item.snippet.publishedAt),
      channelTitle: item.snippet.channelTitle,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
  });
}

export async function getDetailVideo(videoId: string): Promise<DetailVideo> {
  return await axios({
    url: `${process.env.REACT_APP_YOUTUBE_BASE_URL}/videos`,
    params: {
      ...defaultParams,
      id: videoId,
    },
    method: 'GET',
  }).then((res) => {
    const data = res.data;
    const item = data.items[0].snippet;
    return {
      id: data.id,
      title: item.title,
      description: item.description,
      channelId: item.channelId,
    };
  });
}

export async function getDetailChannel(
  channelId: string
): Promise<DetailChannel> {
  return await axios({
    url: `${process.env.REACT_APP_YOUTUBE_BASE_URL}/channels`,
    params: {
      ...defaultParams,
      id: channelId,
    },
    method: 'GET',
  }).then((res) => {
    const items = res.data.items ?? [];
    const item = items[0];
    return {
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
    };
  });
}

export async function getVideosByChannelId(
  channelId: string
): Promise<Video[]> {
  return await axios({
    url: `${process.env.REACT_APP_YOUTUBE_BASE_URL}/playlists`,
    params: {
      ...defaultParams,
      maxResults: MAX_RESULTS,
      channelId,
    },
    method: 'GET',
  }).then((res) => {
    const items = res.data.items;
    return items.map((item: any) => ({
      id: item.id,
      publishedAt: new Date(item.snippet.publishedAt),
      channelTitle: item.snippet.channelTitle,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
  });
}
