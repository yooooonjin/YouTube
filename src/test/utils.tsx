import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Youtube from '../api/Youtube';
import { YoutubeApiContext } from '../context/YoutubeApiContext';

export function withRouter(routes: React.ReactNode, initialEntry = '/') {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

export function withAllContexts(
  children: React.ReactNode,
  youtube: Youtube | null
) {
  const testClient = createTestQueryClient();
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
    </YoutubeApiContext.Provider>
  );
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
}
