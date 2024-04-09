import React from 'react';
import Youtube from '../api/Youtube';
import { YoutubeClient } from '../api/YoutubeClient';
import { YoutubeApiContext } from './YoutubeApiContext';

const client = new YoutubeClient();
const youtube = new Youtube(client);

export default function YoutubeApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}
