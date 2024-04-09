import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, useLocation } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withRouter } from '../../test/utils';
import { fakeVideo as video } from '../../test/videos';
import VideoCard from '../VideoCard';

describe('VideoCart', () => {
  const { channelTitle, thumbnail, title, id } = video;

  it('renders col type correctly', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<VideoCard video={video} />} />)
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders row type correctly', () => {
    const component = renderer.create(
      withRouter(
        <Route path='/' element={<VideoCard video={video} direction='row' />} />
      )
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders video item', () => {
    //Given
    render(
      withRouter(<Route path='/' element={<VideoCard video={video} />} />)
    );

    //When
    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src).toBe(thumbnail);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
  });

  it('navigates to detailed video page when clicked', async () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      withRouter(
        <>
          <Route path='/' element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${id}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );

    const card = screen.getByRole('link');
    await userEvent.click(card);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
