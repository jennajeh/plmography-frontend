/* eslint-disable react/prop-types */
import { useLocalStorage } from 'usehooks-ts';
import usePostCommentFormStore from '../../hooks/usePostCommentFormStore';
import Input from '../common/Input';

export default function PostCommentForm({ onSubmit }) {
  const [accessToken] = useLocalStorage('accessToken', '');
  const postCommentFormStore = usePostCommentFormStore();

  return (
    <div>
      {accessToken ? (
        <form onSubmit={onSubmit}>
          <Input
            name="input-comment"
            label="댓글 달기"
            type="text"
            value={postCommentFormStore.body || ''}
            onChange={(e) => postCommentFormStore.changeBody(e.target.value)}
            errorMessage={postCommentFormStore.errors.body}
            placeholder="댓글을 입력해 주세요"
          />
          <button type="submit">등록</button>
        </form>
      ) : (
        <form onSubmit={onSubmit}>
          <Input
            label="댓글 달기"
            placeholder="로그인 해주세요"
          />
          <button type="submit" disabled>등록</button>
        </form>
      )}
    </div>
  );
}
