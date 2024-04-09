import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../test/utils';
import { fakeDetailVideo as detailVideo } from '../../test/videos';
import Video from '../Video';

describe('Video', () => {
  let fakeYoutube: any = { getDetailChannel: jest.fn() };
  afterEach(() => {
    fakeYoutube.getDetailChannel.mockReset();
  });

  it('renders correctly', async () => {
    const { asFragment } = renderChannelInfoWithCallback(() => ({
      title: 'channel title',
      thumbnail: 'channel thumbnail',
    }));
    await waitFor(() => screen.getByRole('img'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without URL', async () => {
    renderChannelInfoWithCallback(() => {
      throw new Error('error');
    });
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('renders with URL', async () => {
    renderChannelInfoWithCallback(() => ({
      title: 'channel title',
      thumbnail: 'channel thumbnail',
    }));
    expect(screen.findByRole('img'));
  });

  function renderChannelInfoWithCallback(callback: Function) {
    fakeYoutube.getDetailChannel.mockImplementation(callback);
    return render(
      withAllContexts(
        withRouter(<Route path='/' element={<Video video={detailVideo} />} />),
        fakeYoutube
      )
    );
  }
});
