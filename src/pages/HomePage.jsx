import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Home from '../components/home/Home';
import useArticleStore from '../hooks/useArticleStore';
import useContentStore from '../hooks/useContentStore';

export default function HomePage() {
  const contentStore = useContentStore();
  const articleStore = useArticleStore();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    contentStore.fetchTopRatedContents();
  }, []);

  useEffect(() => {
    articleStore.fetchArticles({ page, size: 5 });
  }, [page]);

  return (
    <Home />
  );
}
