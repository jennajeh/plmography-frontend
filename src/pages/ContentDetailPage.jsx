import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import ContentDetail from '../components/content/ContentDetail';
import useArticleStore from '../hooks/useArticleStore';
import useReviewCommentStore from '../hooks/useReviewCommentStore';
import useContentStore from '../hooks/useContentStore';
import useReviewStore from '../hooks/useReviewStore';
import useUserStore from '../hooks/useUserStore';

export default function ContentsDetailPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const contentStore = useContentStore();
  const reviewStore = useReviewStore();
  const userStore = useUserStore();
  const reviewCommentStore = useReviewCommentStore();
  const articleStore = useArticleStore();

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const tmdbId = location.pathname.split('/')[2];

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    contentStore.fetchContent(tmdbId);
  }, [tmdbId]);

  useEffect(() => {
    if (accessToken === '') {
      reviewStore.fetchReviewsWithNotLoggedIn({ page, size: 5 });
      articleStore.fetchArticles({ page, size: 5 });

      return;
    }

    reviewStore.fetchReviews({ page, size: 5 });
    articleStore.fetchArticles({ page, size: 5 });
  }, [page]);

  useEffect(() => {
    userStore.fetchUsers();
    userStore.fetchMe();
    reviewStore.fetchMyReviews();
    reviewCommentStore.fetchComments();
  }, []);

  return (
    <ContentDetail />
  );
}
