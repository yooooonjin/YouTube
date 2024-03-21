import YouTube from 'react-youtube';

type Props = {
  videoId: string;
};
export default function YoutubePlayer({ videoId }: Props) {
  return (
    <YouTube
      className='w-full'
      videoId={videoId}
      opts={{
        width: '100%',
        height: '315',
        playerVars: {
          autoplay: 1,
          rel: 1,
        },
      }}
      onEnd={(e) => {
        e.target.stopVideo(0);
      }}
    />
  );
}
