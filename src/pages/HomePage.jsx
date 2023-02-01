import { useEffect } from 'react';
import Home from '../components/home/Home';
import useContentStore from '../hooks/useContentStore';

export default function HomePage() {
  const contentStore = useContentStore();

  useEffect(() => {
    contentStore.fetchTopRatedContents();
  }, []);

  return (
    <Home />
  );
}
