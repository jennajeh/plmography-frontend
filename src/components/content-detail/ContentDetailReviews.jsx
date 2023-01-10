import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useReviewStore from '../../hooks/useReviewStore';
import useUserStore from '../../hooks/useUserStore';

export default function ContentDetailReviews() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accessToken] = useLocalStorage('accessToken', '');
  const reviewStore = useReviewStore();
  const userStore = useUserStore();

  if (reviewStore.isReviewLoading || !reviewStore.review) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  const { reviews } = reviewStore;

  return (
    <div>
      {accessToken ? (
        <div>
          <h3 style={{ color: 'red' }}>리뷰</h3>
          <div>
            <h4 style={{ color: 'blue' }}>내가 쓴 리뷰</h4>
            {reviews.length ? (
              <ul>
                {reviews.map((review) => (
                  <li key={review.id}>
                    <p>
                      userId:
                      {' '}
                      {review.userId}
                    </p>
                    <p>
                      reviewBody:
                      {' '}
                      {review.reviewBody}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p>⭐️ 짧게라도 좋으니 작품에 대해 감상을 기록해보세요.</p>
                <button type="button">리뷰 작성하기</button>
              </div>
            )}
          </div>
          <div>
            <h4 style={{ color: 'blue' }}>모든 리뷰</h4>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ color: 'red' }}>아아</h3>
        </div>
      )}
    </div>
  );
}
