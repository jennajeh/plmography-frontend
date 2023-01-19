/* eslint-disable react/prop-types */
import useCommentFormStore from '../../hooks/useCommentFormStore';

export default function CommentForm({ onSubmit }) {
  const commentFormStore = useCommentFormStore();

  return (
    <>
      <p>댓글달기</p>
      <form onSubmit={onSubmit}>
        <textarea
          name="input-comment"
          value={commentFormStore.body || ''}
          onChange={(e) => commentFormStore.changeBody(e.target.value)}
        />
        <button type="submit">등록</button>
      </form>
    </>
  );
}
