import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useYoutubeApi } from '../context/YoutubeApiProvider';
import { Video } from '../model/video';
import VideoCard from './VideoCard';
type Props = {
  channelId: string;
};
export default function ChannelVideos({ channelId }: Props) {
  const { youtube } = useYoutubeApi();
  const {} = useQuery({
    queryKey: ['channelVideos', channelId],
    queryFn: async () => {
      youtube?.getVideosByChannelId(channelId).then((res) => setVideos(res));
    },
  });
  const [videos, setVideos] = useState<Video[]>();

  return (
    <section>
      <ul className=''>
        {videos &&
          videos.map((video) => (
            <li key={video.id} className='mb-2'>
              <VideoCard video={video} direction='row' />
            </li>
          ))}
      </ul>
    </section>
  );
}
