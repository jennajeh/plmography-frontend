import {
  useLocation, useNavigate, useParams, useSearchParams,
} from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useContentStore from '../../hooks/useContentStore';
import useReviewStore from '../../hooks/useReviewStore';
import useUserStore from '../../hooks/useUserStore';
import Pagination from '../page/Pagination';

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
  const { reviews, review } = reviewStore;
  const { content } = contentStore;

  console.log(review);
  console.log(content);

  const {
    id: userId, birthYear, email, gender, nickname, profileImage,
  } = user;

  const myReview = reviewStore.isMyReview(Number(content.tmdbId));
  const otherReview = reviewStore.isOtherReview(userId);
  const sameContentReview = reviewStore.isSameContentReview(Number(content.tmdbId));

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
        <div>
          <h3 style={{ color: 'red' }}>리뷰</h3>
          <div>
            <h4 style={{ color: 'blue' }}>내가 쓴 리뷰</h4>
            {myReview && sameContentReview ? (
              <>
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
              </>
            ) : (
              <div>
                <p>⭐️ 짧게라도 좋으니 작품에 대해 감상을 기록해보세요.</p>
                <button type="button">리뷰 작성하기</button>
              </div>
            )}
          </div>
        </div>
      ) : null}
      <div>
        <h4 style={{ color: 'blue' }}>모든 리뷰</h4>
        {reviews.length && otherReview && sameContentReview ? (
          <ul>
            {sameContentReview.map((item) => (
              <li key={item.id}>
                <p>
                  nickname:
                  {' '}
                  {item.writer.nickname}
                </p>
                <p>
                  profile:
                  {' '}
                  {item.writer.profileImage}
                </p>
                <p>
                  starRate:
                  {' '}
                  {item.starRate}
                </p>
                <p>
                  reviewBody:
                  {' '}
                  {item.reviewBody}
                </p>
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
