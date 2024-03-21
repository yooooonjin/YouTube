export type Video = {
  id: string;
  publishedAt: Date;
  channelTitle: string;
  title: string;
  thumbnail: string;
};

export type DetailVideo = {
  id: string;
  title: string;
  description: string;
  channelId: string;
};

export type DetailChannel = {
  id: string;
  title: string;
  thumbnail: string;
};
