/* eslint-disable react/prop-types */
import styled from 'styled-components';
import dateFormat from '../../utils/dateFormat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function PostDetailComment({ comment }) {
  const {
    id: commentId, deleted, updatedAt, postCommentBody, postId, writer,
  } = comment;

  return (
    <Container>
      <Wrapper>
        {writer.nickname}
        {postCommentBody}
        {dateFormat(updatedAt)}
      </Wrapper>
    </Container>
  );
}
