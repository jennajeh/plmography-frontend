import MyReview from '../review/MyReview';
import OtherReview from '../review/OtherReview';

export default function ContentDetailReviews() {
  return (
    <div>
      <h3 style={{ color: 'red' }}>리뷰</h3>
      <MyReview />
      <OtherReview />
    </div>
  );
}
