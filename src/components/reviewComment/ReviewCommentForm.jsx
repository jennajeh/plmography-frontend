/* eslint-disable react/prop-types */
import styled from 'styled-components';
import useReviewCommentFormStore from '../../hooks/useReviewCommentFormStore';
import useReviewCommentStore from '../../hooks/useReviewCommentStore';
import Input from '../common/Input';

const CommentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
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
`;

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
      <CommentBox>
        <Input
          height={30}
          name="input-comment"
          type="text"
          value={reviewCommentFormStore.body || ''}
          onChange={(e) => reviewCommentFormStore.changeBody(e.target.value)}
          errorMessage={reviewCommentFormStore.errors.body}
        />
        <Button type="submit">등록</Button>
        <Button type="button" onClick={handleClickCancel}>취소</Button>
      </CommentBox>
    </form>
  );
}
