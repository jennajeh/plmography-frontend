import { useLocation, useSearchParams } from 'react-router-dom';

import Pagination from '../page/Pagination';
import useReviewStore from '../../hooks/useReviewStore';
import MyReview from '../review/MyReview';
import OtherReview from '../review/OtherReview';

export default function ContentDetailReviews() {
  const reviewStore = useReviewStore();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  return (
    <div>
      <MyReview />
      <OtherReview />
      <Pagination
        url={location.pathname}
        total={reviewStore.totalPages}
        current={page}
      />
    </div>
  );
}
