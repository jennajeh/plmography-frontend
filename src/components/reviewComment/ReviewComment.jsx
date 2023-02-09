/* eslint-disable react/prop-types */
import { useLocalStorage } from 'usehooks-ts';
import useReviewCommentFormStore from '../../hooks/useReviewCommentFormStore';
import useReviewCommentStore from '../../hooks/useReviewCommentStore';
import useUserStore from '../../hooks/useUserStore';
import dateFormat from '../../utils/dateFormat';
import Modal from '../common/Modal';
import ReviewCommentForm from './ReviewCommentForm';

export default function ReviewComment({ review }) {
  const [accessToken] = useLocalStorage('accessToken', '');
  const reviewCommentStore = useReviewCommentStore();
  const reviewCommentFormStore = useReviewCommentFormStore();
  const userStore = useUserStore();

  const { user } = userStore;
  const { id: userId } = user;
  const { createCommentButtonOpened } = reviewCommentStore;

  const commentNotDeleted = reviewCommentStore.isDeleted();

  const handleClickDeleteComment = async (comment) => {
    await reviewCommentStore.delete(comment.id);

    reviewCommentStore.fetchComments();
  };

  const handleSubmitCreateComment = async (e) => {
    e.preventDefault();

    reviewCommentFormStore.validate();

    if (reviewCommentFormStore.isValidateSuccessful) {
      await reviewCommentStore.create(userId, review.id, reviewCommentFormStore.body);
      reviewCommentFormStore.reset();
      reviewCommentStore.changeCreateCommentButtonStatus();

      reviewCommentStore.fetchComments();
    }
  };

  return (
    <div>
      {commentNotDeleted.length ? (
        <ul>
          {commentNotDeleted.map((comment) => (
            <li key={comment.id}>
              {comment.postId === review.id ? (
                <>
                  <p>
                    createdAt:
                    {' '}
                    {dateFormat(comment.updatedAt)}
                  </p>
                  <p>
                    nickname:
                    {' '}
                    {comment.writer.nickname}
                  </p>
                  <p>
                    profile:
                    {' '}
                    <img src={comment.writer.profileImage} alt="profileImage" />
                  </p>
                  <p>
                    commentBody:
                    {' '}
                    {comment.commentBody}
                  </p>
                  {accessToken ? (
                    <Modal
                      buttonName="삭제하기"
                      content="정말 삭제하시겠습니까?"
                      onClose={() => handleClickDeleteComment(comment)}
                    />
                  ) : null}
                </>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
      {createCommentButtonOpened && (
        <ReviewCommentForm
          onSubmit={handleSubmitCreateComment}
        />
      )}
    </div>
  );
}
