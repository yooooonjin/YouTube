import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import YoutubeApiProvider from './context/YoutubeApiProvider';

export default function App() {
  return (
    <>
      <SearchHeader />
      <YoutubeApiProvider>
        <Outlet />
      </YoutubeApiProvider>
    </>
  );
}
