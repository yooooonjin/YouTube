import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () => await youtube?.search(keyword),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Someting is wrong...</p>;
  return (
    <section className='py-5 px-3'>
      {videos && (
        <ul className='grid sm:grid-cols-3 md:grid-cols-5 gap-1'>
          {videos.map((video) => (
            <li key={video.id}>
              <VideoCard video={video} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
