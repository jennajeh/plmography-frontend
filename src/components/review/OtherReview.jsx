import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useReviewCommentStore from '../../hooks/useReviewCommentStore';

import Likes from '../common/Likes';
import dateFormat from '../../utils/dateFormat';
import useReviewStore from '../../hooks/useReviewStore';
import useContentStore from '../../hooks/useContentStore';
import ReviewComment from '../reviewComment/ReviewComment';

export default function OtherReview() {
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage('accessToken', '');
  const [searchParams] = useSearchParams();

  const reviewCommentStore = useReviewCommentStore();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();

  const page = searchParams.get('page') ?? 1;
  const { content } = contentStore;

  const commentNotDeleted = reviewCommentStore.isDeleted();
  const otherSameContentReview = reviewStore.isOtherSameContentReview(content.tmdbId);
  const isNotDeleted = reviewStore.isDeletedAllReviews(otherSameContentReview);

  const handleClickLike = async (review) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    await reviewStore.toggleLike(review.id);

    reviewStore.fetchReviews({ page, size: 5 });
  };

  const handleClickComment = () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    reviewCommentStore.changeCreateCommentButtonStatus();
  };

  return (
    <div>
      <h4 style={{ color: 'blue' }}>모든 리뷰</h4>
      {isNotDeleted.length ? (
        <ul>
          {isNotDeleted.map((review) => (
            <li key={review.id}>
              <p>
                createdAt:
                {' '}
                {dateFormat(review.updatedAt)}
              </p>
              <Link to={`/users/${review.writer.id}`}>
                <p>
                  nickname:
                  {' '}
                  {review.writer.nickname}
                </p>
              </Link>
              <p>
                profile:
                {' '}
                <img src={review.writer.profileImage} alt="profileImage" />
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
              <Likes
                count={review.likeUserIds.length}
                onClick={() => handleClickLike(review)}
              />
              <p>
                {commentNotDeleted.length}
                개
              </p>
              <button
                type="button"
                onClick={handleClickComment}
              >
                댓글달기
              </button>
              <ReviewComment review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p>등록된 리뷰가 없습니다.</p>
      )}
    </div>
  );
}
