import { DetailChannel, DetailVideo, Video } from '../model/video';

export interface Client {
  search: (params: { [key: string]: string | number }) => Promise<any>;
  popular: (params: { [key: string]: string | number }) => Promise<any>;
  playlists: (params: { [key: string]: string | number }) => Promise<any>;
  detailVideo: (params: { [key: string]: string | number }) => Promise<any>;
  detailChannel: (params: { [key: string]: string | number }) => Promise<any>;
}

const MAX_RESULTS = 25;

export default class Youtube {
  apiClient: Client;

  constructor(apiClient: Client) {
    this.apiClient = apiClient;
  }

  async search(keyword?: string): Promise<Video[]> {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword: string) {
    return this.apiClient
      .search({
        part: 'snippet',
        maxResults: MAX_RESULTS,
        q: keyword,
      })
      .then((res) => {
        const items = res.data.items;
        return convertVideos(items);
      });
  }

  async #mostPopular() {
    return this.apiClient
      .popular({
        part: 'snippet',
        maxResults: MAX_RESULTS,
        chart: 'mostPopular',
      })
      .then((res) => {
        const items = res.data.items;
        return convertVideos(items);
      });
  }

  async getVideosByChannelId(channelId: string): Promise<Video[]> {
    return await this.apiClient
      .playlists({
        part: 'snippet',
        maxResults: MAX_RESULTS,
        channelId: channelId,
      })
      .then((res) => {
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

  async getDetailVideo(videoId: string): Promise<DetailVideo> {
    return this.apiClient
      .detailVideo({ part: 'snippet', id: videoId })
      .then((res) => {
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

  async getDetailChannel(channelId: string): Promise<DetailChannel> {
    return this.apiClient
      .detailChannel({ part: 'snippet', id: channelId })
      .then((res) => {
        const items = res.data.items ?? [];
        const item = items[0];
        return {
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
        };
      });
  }
}

function convertVideos(videos: any): Video[] {
  return videos.map((video: any) => ({
    id: video.id ?? video.id.videoId,
    publishedAt: new Date(video.snippet.publishedAt),
    channelTitle: video.snippet.channelTitle,
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.default.url,
  }));
}
