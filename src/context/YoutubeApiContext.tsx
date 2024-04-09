import React, { createContext, useContext } from 'react';
import Youtube from '../api/Youtube';

export const YoutubeApiContext = createContext<{ youtube: Youtube | null }>({
  youtube: null,
});

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
