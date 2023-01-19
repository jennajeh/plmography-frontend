import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ArticleDetail from '../components/articles/ArticleDetail';
import useArticleStore from '../hooks/useArticleStore';
import useContentStore from '../hooks/useContentStore';
import useTmdbYoutubeApiStore from '../hooks/useTmdbYoutubeApiStore';

export default function ArticleDetailPage() {
  const articleStore = useArticleStore();
  const contentStore = useContentStore();
  const tmdbYoutubeApiStore = useTmdbYoutubeApiStore();

  const { content } = contentStore;
  const { tmdbId, type } = content;

  const location = useLocation();
  const contentId = location.pathname.split('/')[2];

  useEffect(() => {
    articleStore.fetchArticle(Number(contentId));
    contentStore.fetchContent(Number(contentId));
  }, [Number(contentId)]);

  useEffect(() => {
    if (tmdbId) {
      tmdbYoutubeApiStore.fetchVideo(tmdbId, type);
    }
  }, [tmdbId]);

  return (
    <ArticleDetail />
  );
}
