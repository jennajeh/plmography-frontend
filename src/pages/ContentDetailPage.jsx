import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ContentDetail from '../components/content-detail/ContentDetail';
import useContentStore from '../hooks/useContentStore';
import useReviewStore from '../hooks/useReviewStore';
import useUserStore from '../hooks/useUserStore';

export default function ContentsDetailPage() {
  const contentStore = useContentStore();
  const reviewStore = useReviewStore();
  const userStore = useUserStore();

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const tmdbId = location.pathname.split('/')[2];

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    contentStore.fetchContent(tmdbId);
  }, [tmdbId]);

  useEffect(() => {
    reviewStore.fetchReviews({ page, size: 5 });
  }, [page]);

  useEffect(() => {
    userStore.fetchUsers();
    userStore.fetchMe();
    reviewStore.fetchMyReviews();
  }, []);

  return (
    <ContentDetail />
  );
}
