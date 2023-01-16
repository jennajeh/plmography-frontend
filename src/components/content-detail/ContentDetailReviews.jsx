import {
  Link,
  useLocation, useNavigate, useParams, useSearchParams,
} from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import Pagination from '../page/Pagination';
import Likes from '../common/Likes';
import Modal from '../common/Modal';

import useContentStore from '../../hooks/useContentStore';
import useReviewStore from '../../hooks/useReviewStore';
import useUserStore from '../../hooks/useUserStore';

import dateFormat from '../../utils/dateFormat';

export default function ContentDetailReviews() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accessToken] = useLocalStorage('accessToken', '');
  const reviewStore = useReviewStore();
  const userStore = useUserStore();
  const contentStore = useContentStore();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;
  const { user } = userStore;
  const { myReviews } = reviewStore;

  const { content } = contentStore;

  const { id: userId } = user;

  const otherReviews = reviewStore.isOtherReview(userId);
  const mySameContentReview = reviewStore.isMySameContentReview(Number(content.tmdbId));
  const otherSameContentReview = reviewStore.isOtherSameContentReview(Number(content.tmdbId));
  const isDeleted = mySameContentReview[0]?.deleted;

  const handleClickLike = () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    reviewStore.toggleLike(id);
  };

  const handleClickDelete = async () => {
    await reviewStore.delete(mySameContentReview[0].id);

    reviewStore.fetchMyReviews();
  };

  if (reviewStore.isReviewLoading || !reviewStore.review) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  return (
    <div>
      {accessToken ? (
        <form>
          <div>
            <h3 style={{ color: 'red' }}>리뷰</h3>
            <div>
              <h4 style={{ color: 'blue' }}>내가 쓴 리뷰</h4>
              {myReviews.length && mySameContentReview.length && !isDeleted ? (
                <ul>
                  {mySameContentReview.map((review) => (
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
                        {review.writer?.profileImage}
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
                        onClose={handleClickDelete}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div>
                  <p>⭐️ 짧게라도 좋으니 작품에 대한 감상을 기록해보세요.</p>
                  <Link to="/reviews/create">리뷰 작성하기</Link>
                </div>
              )}
            </div>
          </div>
        </form>
      ) : null}
      <div>
        <h4 style={{ color: 'blue' }}>모든 리뷰</h4>
        {otherReviews.length && otherSameContentReview.length ? (
          <ul>
            {otherSameContentReview.map((review) => (
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
                  {review.writer.profileImage}
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
                  onClick={handleClickLike}
                />
                <button type="button">댓글달기</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>등록된 리뷰가 없습니다.</p>
        )}
        <Pagination
          url={location.pathname}
          total={reviewStore.totalPages}
          current={page}
        />
      </div>
    </div>
  );
}
