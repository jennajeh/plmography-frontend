import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Home from '../components/home/Home';
import useArticleStore from '../hooks/useArticleStore';
import useContentStore from '../hooks/useContentStore';
import usePostStore from '../hooks/usePostStore';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const contentStore = useContentStore();
  const articleStore = useArticleStore();
  const postStore = usePostStore();

  const date = new Date();
  const month = date.getMonth() + 1;
  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    contentStore.fetchTopRatedContents();
    articleStore.fetchRecentlyCreatedArticles();
    postStore.fetchHitPosts();
  }, []);

  useEffect(() => {
    contentStore.fetchExpiredNetflix({ month, page, size: 8 });
  }, [page, month]);

  return (
    <Home />
  );
}
