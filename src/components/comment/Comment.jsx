/* eslint-disable react/prop-types */
import { useLocalStorage } from 'usehooks-ts';
import useCommentFormStore from '../../hooks/useCommentFormStore';
import useCommentStore from '../../hooks/useCommentStore';
import useUserStore from '../../hooks/useUserStore';
import dateFormat from '../../utils/dateFormat';
import Modal from '../modal/ReviewModal';
import CommentForm from './CommentForm';

export default function Comment({ review }) {
  const [accessToken] = useLocalStorage('accessToken', '');
  const commentStore = useCommentStore();
  const commentFormStore = useCommentFormStore();
  const userStore = useUserStore();

  const { user } = userStore;
  const { id: userId } = user;

  const { createCommentButtonOpened } = commentStore;
  const commentNotDeleted = commentStore.isDeleted();

  const handleClickDeleteComment = async (comment) => {
    await commentStore.delete(comment.id);

    commentStore.fetchComments();
  };

  const handleSubmitCreateComment = async (e) => {
    e.preventDefault();

    commentFormStore.validate();

    if (commentFormStore.isValidateSuccessful) {
      await commentStore.create(userId, review.id, commentFormStore.body);
      commentFormStore.reset();
      commentStore.changeCreateCommentButtonStatus();

      commentStore.fetchComments();
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
        <CommentForm
          onSubmit={handleSubmitCreateComment}
        />
      )}
    </div>
  );
}
