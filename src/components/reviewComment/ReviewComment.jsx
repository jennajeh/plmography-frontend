/* eslint-disable react/prop-types */
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useReviewCommentFormStore from '../../hooks/useReviewCommentFormStore';
import useReviewCommentStore from '../../hooks/useReviewCommentStore';
import useReviewStore from '../../hooks/useReviewStore';
import useUserStore from '../../hooks/useUserStore';
import dateFormat from '../../utils/dateFormat';
import Modal from '../common/Modal';
import ReviewCommentForm from './ReviewCommentForm';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 30px;

  li {
    display: flex;
    flex-direction: column;
    padding: 0;
    border-radius: 10px;
    background-color: ${((props) => props.theme.colors.third)};
  }
`;

const UserBox = styled.div`
  display: flex;
  gap: 10px;

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
      color: ${((props) => props.theme.text.fifthGrey)};
    }
  }
`;

export default function ReviewComment({ review }) {
  const [searchParams] = useSearchParams();
  const [accessToken] = useLocalStorage('accessToken', '');
  const reviewStore = useReviewStore();
  const reviewCommentStore = useReviewCommentStore();
  const reviewCommentFormStore = useReviewCommentFormStore();
  const userStore = useUserStore();

  const page = searchParams.get('page') ?? 1;
  const { user } = userStore;
  const { id: userId } = user;
  const { createCommentButtonOpened } = reviewCommentStore;

  const commentNotDeleted = reviewCommentStore.isDeleted();

  const handleClickDeleteComment = async (comment) => {
    await reviewCommentStore.delete(comment.id);

    reviewCommentStore.fetchComments();
    reviewStore.fetchReviews({ page, size: 5 });
  };

  const handleSubmitCreateComment = async (e) => {
    e.preventDefault();

    reviewCommentFormStore.validate();

    if (reviewCommentFormStore.isValidateSuccessful) {
      await reviewCommentStore.create(userId, review.id, reviewCommentFormStore.body);
      reviewCommentFormStore.reset();
      reviewCommentStore.changeCreateCommentButtonStatus();

      reviewCommentStore.fetchComments();
      reviewStore.fetchReviews({ page, size: 5 });
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {createCommentButtonOpened && commentNotDeleted.length !== 0 && (
        <List>
          {commentNotDeleted.map((comment) => (
            <li key={comment.id}>
              {comment.postId === review.id && (
                <>
                  <UserBox>
                    <img src={comment.writer.profileImage} alt="profileImage" />
                    <div>
                      <Link to={`/users/${comment.writer.id}`}>
                        {comment.writer.nickname}
                      </Link>
                      <p>
                        {dateFormat(comment.updatedAt)}
                      </p>
                    </div>
                  </UserBox>
                  <p>
                    {comment.reviewCommentBody}
                  </p>
                  {accessToken && (
                    <Modal
                      buttonName="삭제하기"
                      content="정말 삭제하시겠습니까?"
                      onClose={() => handleClickDeleteComment(comment)}
                    />
                  )}
                </>
              )}
            </li>
          ))}
        </List>
      )}
      {createCommentButtonOpened && commentNotDeleted.length && (
        <ReviewCommentForm
          onSubmit={handleSubmitCreateComment}
        />,
      )}
    </div>
  );
}
