import { useEffect, useState } from 'react';
import {
  Link,
  useLocation, useNavigate, useParams, useSearchParams,
} from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useContentStore from '../../hooks/useContentStore';
import useReviewFormStore from '../../hooks/useReviewFormStore';
import useReviewStore from '../../hooks/useReviewStore';
import useUserStore from '../../hooks/useUserStore';
import dateFormat from '../../utils/dateFormat';
import Likes from '../common/Likes';
import Modal from '../common/Modal';
import Pagination from '../page/Pagination';

export default function ContentDetailReviews() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accessToken] = useLocalStorage('accessToken', '');
  const reviewStore = useReviewStore();
  const userStore = useUserStore();
  const contentStore = useContentStore();
  const reviewFormStore = useReviewFormStore();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;
  const { user } = userStore;
  const { reviews, review } = reviewStore;
  const { content } = contentStore;

  const { id: userId } = user;

  const myReview = reviewStore.isMyReview(Number(content.tmdbId));
  const otherReview = reviewStore.isOtherReview(userId);
  const sameContentReview = reviewStore.isSameContentReview(Number(content.tmdbId));

  console.log(review);

  const handleClickLike = () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    reviewStore.toggleLike(id);
  };

  const handleClickDelete = async () => {
    await reviewStore.delete(review.id);

    reviewStore.fetchMyReview();
    // TODO : 등록된 나의 리뷰가 없을 때 400 에러 나는 것 고쳐야 함.
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();

    reviewFormStore.validate();

    if (reviewFormStore.isValidateSuccessful) {
      reviewStore.modify({
        body: reviewFormStore.body,
      });

      reviewFormStore.reset();
    }
  };

  useEffect(() => {
    reviewFormStore.fillFields(review);
  }, [review]);

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
              {review && myReview ? (
                <>
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
                </>
              ) : (
                <div>
                  <p>⭐️ 짧게라도 좋으니 작품에 대해 감상을 기록해보세요.</p>
                  <button type="submit">리뷰 작성하기</button>
                </div>
              )}
            </div>
          </div>
        </form>
      ) : null}
      <div>
        <h4 style={{ color: 'blue' }}>모든 리뷰</h4>
        {reviews.length && otherReview && sameContentReview ? (
          <ul>
            {sameContentReview.map((userReview) => (
              <li key={userReview.id}>
                <p>
                  createdAt:
                  {' '}
                  {dateFormat(userReview.updatedAt)}
                </p>
                <p>
                  nickname:
                  {' '}
                  {userReview.writer.nickname}
                </p>
                <p>
                  profile:
                  {' '}
                  {userReview.writer.profileImage}
                </p>
                <p>
                  starRate:
                  {' '}
                  {userReview.starRate}
                </p>
                <p>
                  reviewBody:
                  {' '}
                  {userReview.reviewBody}
                </p>
                <Likes
                  count={userReview.likeUserIds.length}
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
