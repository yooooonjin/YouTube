import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { DetailVideo } from '../model/video';
import YoutubePlayer from './YoutubePlayer';

type Props = {
  video: DetailVideo;
};

export default function Video({ video }: Props) {
  const { youtube } = useYoutubeApi();

  const { data: channel } = useQuery({
    queryKey: ['channel', video.channelId],
    queryFn: async () => youtube?.getDetailChannel(video.channelId),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section>
      {!video ? (
        <p>loading...</p>
      ) : (
        <>
          <YoutubePlayer videoId={video.id} />
          <div className='mt-5'>
            <h1 className=' font-semibold mb-5'>{video.title}</h1>
            {channel && (
              <div className='flex items-center mb-5'>
                {channel.thumbnail && (
                  <img
                    className='rounded-full mr-2'
                    src={channel.thumbnail}
                    alt='channel_thumbnail'
                    width={30}
                  />
                )}
                <p>{channel.title}</p>
              </div>
            )}
            <p className='text-xs line-clamp-3'>{video.description}</p>
          </div>
        </>
      )}
    </section>
  );
}
