import React, { createContext, useContext } from 'react';
import Youtube from '../api/Youtube';
import { YoutubeClient } from '../api/YoutubeClient';

export const YoutubeApiContext = createContext<{ youtube: Youtube | null }>({
  youtube: null,
});

export default function YoutubeApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new YoutubeClient();
  const youtube = new Youtube(client);
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
