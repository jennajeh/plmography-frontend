/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import usePostCommentEditFormStore from '../../hooks/usePostCommentEditFormStore';
import Input from '../common/Input';

export default function PostCommentEditForm({ onSubmit, comment }) {
  const postCommentEditFormStore = usePostCommentEditFormStore();

  useEffect(() => {
    postCommentEditFormStore.fillFields(comment);
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input
          name="input-comment"
          label="댓글 수정"
          type="text"
          value={postCommentEditFormStore.body || ''}
          onChange={(e) => postCommentEditFormStore.changeBody(e.target.value)}
          errorMessage={postCommentEditFormStore.errors.body}
        />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
