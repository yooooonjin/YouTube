import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ChannelVideos from '../components/ChannelVideos';
import Video from '../components/Video';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { DetailVideo } from '../model/video';

export default function VideoDetail() {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const { youtube } = useYoutubeApi();
  const { data: video } = useQuery({
    queryKey: ['detail', videoId],
    queryFn: async () => videoId && youtube?.getDetailVideo(videoId),
  });

  if (!videoId || videoId === 'undefined') {
    navigate('/');
    return <></>;
  }

  return (
    <section className='flex flex-col sm:flex-row py-5 gap-2 '>
      {video && (
        <>
          <div className='basis-2/3'>
            <Video video={video} />
          </div>
          <div className='basis-1/3'>
            <ChannelVideos channelId={video.channelId} />
          </div>
        </>
      )}
    </section>
  );
}
