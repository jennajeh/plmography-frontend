/* eslint-disable react/prop-types */
import useCommentFormStore from '../../hooks/useCommentFormStore';
import useCommentStore from '../../hooks/useCommentStore';
import Input from '../common/Input';

export default function CommentForm({ onSubmit }) {
  const commentStore = useCommentStore();
  const commentFormStore = useCommentFormStore();

  const handleClickCancel = () => {
    commentFormStore.reset();
    commentStore.changeCreateCommentButtonStatus();

    commentStore.fetchComments();
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="input-comment"
        label="댓글 달기"
        type="text"
        value={commentFormStore.body || ''}
        onChange={(e) => commentFormStore.changeBody(e.target.value)}
        errorMessage={commentFormStore.errors.body}
      />
      <button type="submit">등록</button>
      <button type="button" onClick={handleClickCancel}>취소</button>
    </form>
  );
}
