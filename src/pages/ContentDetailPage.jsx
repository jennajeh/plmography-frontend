import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ContentDetail from '../components/content-detail/ContentDetail';
import useContentStore from '../hooks/useContentStore';
import useReviewStore from '../hooks/useReviewStore';
import useUserStore from '../hooks/useUserStore';

export default function ContentsDetailPage() {
  const contentStore = useContentStore();
  const reviewStore = useReviewStore();
  const userStore = useUserStore();

  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    contentStore.fetchContent(id);
  }, [id]);

  useEffect(() => {
    reviewStore.fetchReviews({ page, size: 5 });
  }, [page]);

  useEffect(() => {
    userStore.fetchUsers();
    userStore.fetchMe();
    reviewStore.fetchMyReview();
  }, []);

  return (
    <ContentDetail />
  );
}
