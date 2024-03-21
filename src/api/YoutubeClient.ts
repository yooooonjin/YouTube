import axios, { AxiosInstance } from 'axios';
import { Client } from './Youtube';

export class YoutubeClient implements Client {
  httpClient: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    });
  }

  async search(params: { [key: string]: string | number }): Promise<any> {
    return this.httpClient.get('search', { params });
  }

  async popular(params: { [key: string]: string | number }): Promise<any> {
    return this.httpClient.get('videos', { params });
  }

  async playlists(params: { [key: string]: string | number }): Promise<any> {
    return this.httpClient.get('playlists', { params });
  }

  async detailVideo(params: { [key: string]: string | number }): Promise<any> {
    return this.httpClient.get('videos', { params });
  }

  async detailChannel(params: {
    [key: string]: string | number;
  }): Promise<any> {
    return this.httpClient.get('channels', { params });
  }
}
