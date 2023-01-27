import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useCommentStore from '../../hooks/useCommentStore';

import Likes from '../common/Likes';
import dateFormat from '../../utils/dateFormat';
import useReviewStore from '../../hooks/useReviewStore';
import useContentStore from '../../hooks/useContentStore';
import Comment from '../comment/Comment';

export default function OtherReview() {
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage('accessToken', '');
  const [searchParams] = useSearchParams();

  const commentStore = useCommentStore();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();

  const page = searchParams.get('page') ?? 1;
  const { content } = contentStore;

  const commentNotDeleted = commentStore.isDeleted();
  const otherSameContentReview = reviewStore.isOtherSameContentReview(Number(content.tmdbId));
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

    commentStore.changeCreateCommentButtonStatus();
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
              <p>
                nickname:
                {' '}
                {review.writer.nickname}
              </p>
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
              <Comment review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p>등록된 리뷰가 없습니다.</p>
      )}
    </div>
  );
}
