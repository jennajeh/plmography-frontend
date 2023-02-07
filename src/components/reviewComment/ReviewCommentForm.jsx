/* eslint-disable react/prop-types */
import useReviewCommentFormStore from '../../hooks/useReviewCommentFormStore';
import useReviewCommentStore from '../../hooks/useReviewCommentStore';
import Input from '../common/Input';

export default function ReviewCommentForm({ onSubmit }) {
  const reviewCommentStore = useReviewCommentStore();
  const reviewCommentFormStore = useReviewCommentFormStore();

  const handleClickCancel = () => {
    reviewCommentFormStore.reset();
    reviewCommentStore.changeCreateCommentButtonStatus();

    reviewCommentStore.fetchComments();
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="input-comment"
        label="댓글 달기"
        type="text"
        value={reviewCommentFormStore.body || ''}
        onChange={(e) => reviewCommentFormStore.changeBody(e.target.value)}
        errorMessage={reviewCommentFormStore.errors.body}
      />
      <button type="submit">등록</button>
      <button type="button" onClick={handleClickCancel}>취소</button>
    </form>
  );
}
