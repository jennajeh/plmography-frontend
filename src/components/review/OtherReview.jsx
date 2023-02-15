import {
  Link, useLocation, useNavigate, useSearchParams,
} from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';
import { useState } from 'react';
import useReviewCommentStore from '../../hooks/useReviewCommentStore';

import Likes from '../common/Likes';
import dateFormat from '../../utils/dateFormat';
import useReviewStore from '../../hooks/useReviewStore';
import useContentStore from '../../hooks/useContentStore';
import ReviewComment from '../reviewComment/ReviewComment';
import Pagination from '../page/Pagination';
import Title from '../common/Title';
import REVIEW_STAR from '../../constants/reviewStar';
import { Comment } from '../../assets/community/index';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  li {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 10px;
    background-color: ${((props) => props.theme.colors.third)};
  }

  span {
    padding: 0 0 0 15px;
  }
`;

const UserBox = styled.div`
  display: flex;
  padding: 15px 0 0 15px;
  gap: 20px;

  img {
    width: 35px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 2px;

    p {
      font-size: 12px;
      color: ${((props) => props.theme.text.fifthGrey)}
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 0 15px 15px;
  gap: 5px;
`;

const Button = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 2px;
  border: none;
  color: ${((props) => props.theme.text.white)};
  background-color: ${((props) => props.theme.text.sixthGrey)};
  border-radius: 5px;

  img {
    margin-right: 7px;
    width: 12px;
  }
`;

const NoReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 14px;
    margin-top: 50px;
  }
`;

export default function OtherReview() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState('');
  const location = useLocation();
  const [accessToken] = useLocalStorage('accessToken', '');
  const [searchParams] = useSearchParams();

  const reviewCommentStore = useReviewCommentStore();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();

  const page = searchParams.get('page') ?? 1;
  const { content } = contentStore;

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

  const handleClickComment = (reviewId) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    reviewCommentStore.changeCreateCommentButtonStatus(reviewId);

    setIsOpen((element) => (element.isOpen !== reviewId ? reviewId : ''));

    if (isOpen === reviewId) {
      setIsOpen(false);
    }
  };

  const getImage = (rate) => {
    const [a] = REVIEW_STAR.filter((i) => i.rate === rate);

    return a.image;
  };

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Title>모든 리뷰</Title>
      {isNotDeleted.length ? (
        <div>
          <List>
            {isNotDeleted.map((review) => (
              <li key={review.id}>
                <UserBox>
                  <img src={review.writer.profileImage} alt="profileImage" />
                  <div>
                    <Link to={`/users/${review.writer.id}`}>
                      {review.writer.nickname}
                    </Link>
                    <p>
                      {dateFormat(review.updatedAt)}
                    </p>
                  </div>
                </UserBox>
                <span>
                  {getImage(review.starRate)}
                </span>
                <span>
                  {review.reviewBody}
                </span>
                <ButtonBox>
                  <Likes
                    count={review.likeUserIds.length}
                    onClick={() => handleClickLike(review)}
                  />
                  <Button
                    type="button"
                    onClick={() => handleClickComment(review.id)}
                  >
                    <img
                      src={Comment}
                      alt="comment"
                    />
                    댓글
                    {' '}
                    {review.commentNumber}
                  </Button>
                </ButtonBox>
                {isOpen === review.id && (
                  <ReviewComment review={review} />
                )}
              </li>
            ))}
          </List>
          <Pagination
            url={location.pathname}
            total={reviewStore.totalPages}
            current={page}
          />
        </div>
      ) : (
        <NoReview>
          <p>등록된 리뷰가 없습니다.</p>
        </NoReview>
      )}
    </>
  );
}
