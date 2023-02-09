import { Link } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useContentStore from '../../hooks/useContentStore';
import useReviewStore from '../../hooks/useReviewStore';
import dateFormat from '../../utils/dateFormat';
import Modal from '../common/Modal';

export default function MyReview() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const contentStore = useContentStore();
  const { content } = contentStore;
  const reviewStore = useReviewStore();
  const { myReviews } = reviewStore;

  const mySameContentReview = reviewStore.isMySameContentReview(content.tmdbId);
  const reviewNotDeleted = reviewStore.isDeletedMyReviews(mySameContentReview);

  const handleClickDeleteReview = async () => {
    await reviewStore.delete(reviewNotDeleted[0].id);

    await reviewStore.fetchMyReviews();
  };

  return (
    <div>
      {accessToken ? (
        <form>
          <div>
            <h4 style={{ color: 'blue' }}>내가 쓴 리뷰</h4>
            {myReviews.length && mySameContentReview.length && reviewNotDeleted.length ? (
              <ul>
                {reviewNotDeleted.map((review) => (
                  <li key={review.id}>
                    <p>
                      createdAt:
                      {' '}
                      {dateFormat(review.updatedAt)}
                    </p>
                    <p>
                      nickname:
                      {' '}
                      {review.writer?.nickname}
                    </p>
                    <p>
                      profileImage:
                      {' '}
                      <img src={review.writer?.profileImage} alt="profileImage" />
                    </p>
                    <p>
                      starRate:
                      {' '}
                      {review.starRate}
                    </p>
                    <p>
                      reviewBody:
                      {' '}
                      {review.reviewBody}
                    </p>
                    <Link to={`/reviews/${review.id}/edit`}>
                      수정하기
                    </Link>
                    <Modal
                      buttonName="삭제하기"
                      content="정말 삭제하시겠습니까?"
                      onClose={handleClickDeleteReview}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p>⭐️ 짧게라도 좋으니 작품에 대한 감상을 기록해보세요.</p>
                <Link to="/reviews/write">리뷰 작성하기</Link>
              </div>
            )}
          </div>
        </form>
      ) : null}
    </div>
  );
}
