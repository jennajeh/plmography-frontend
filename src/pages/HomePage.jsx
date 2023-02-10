import { useEffect } from 'react';
import Home from '../components/home/Home';
import useArticleStore from '../hooks/useArticleStore';
import useContentStore from '../hooks/useContentStore';
import usePostStore from '../hooks/usePostStore';

export default function HomePage() {
  const contentStore = useContentStore();
  const articleStore = useArticleStore();
  const postStore = usePostStore();

  useEffect(() => {
    contentStore.fetchTopRatedContents();
    articleStore.fetchRecentlyCreatedArticles();
    postStore.fetchHitPosts();
  }, []);

  return (
    <Home />
  );
}
