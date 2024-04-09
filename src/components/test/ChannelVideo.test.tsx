import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../test/utils';
import { fakeVideos } from '../../test/videos';
import ChannelVideos from '../ChannelVideos';

describe('ChannelVideo', () => {
  const fakeYoutube: any = {
    getVideosByChannelId: jest.fn(),
  };

  afterEach(() => {
    fakeYoutube.getVideosByChannelId.mockReset();
  });

  it('renders correctly', async () => {
    const { asFragment } = renderChannelVideosWithCallback(() => fakeVideos);
    //loading
    //await waitForElementToBeRemoved(screen.queryByText("Loading..."))
    expect(asFragment()).toMatchSnapshot;
  });

  it('renders channel videos correctly', async () => {
    renderChannelVideosWithCallback(() => fakeVideos);
    expect(fakeYoutube.getVideosByChannelId).toHaveBeenCalledWith('id');
    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length)
    );
  });

  it('renders without videos', async () => {
    renderChannelVideosWithCallback(() => {
      throw new Error('error');
    });
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  function renderChannelVideosWithCallback(callback: Function) {
    fakeYoutube.getVideosByChannelId.mockImplementation(callback);
    return render(
      withAllContexts(
        withRouter(
          <Route path='/' element={<ChannelVideos channelId='id' />} />
        ),
        fakeYoutube
      )
    );
  }
});
