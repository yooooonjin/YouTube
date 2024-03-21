import { Link } from 'react-router-dom';
import { Video } from '../model/video';
type Props = {
  video: Video;
  direction?: 'col' | 'row';
};
export default function VideoCard({ video, direction = 'col' }: Props) {
  return (
    <Link
      to={`/videos/watch/${video.id}`}
      className={`${direction === 'row' && 'flex gap-4'}`}
    >
      <div className='min-w-40'>
        <img
          src={video.thumbnail}
          alt='video_thumbnale'
          className='w-full aspect-video object-cover'
        />
      </div>
      <div className='text-xs'>
        <p className='line-clamp-2 mb-2'>{video.title}</p>
        <p className='text-[0.6rem] font-light'>{video.channelTitle}</p>
        <p className='text-[0.6rem] font-light'>
          {video.publishedAt.getDate()} days ago
        </p>
      </div>
    </Link>
  );
}
