/* eslint-disable react/prop-types */
import styled from 'styled-components';
import dateFormat from '../../utils/dateFormat';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

`;

const Nickname = styled.span`
  font-size: 20px;
  font-weight: 1000;
  color: ${((props) => props.theme.text.white)};
`;

const Content = styled.div`
  color: ${((props) => props.theme.text.secondGrey)};
  line-height: 2rem;
`;

const CreatedAt = styled.div`
  color: ${((props) => props.theme.text.fourthGrey)};
`;

export default function PostDetailComment({ comment }) {
  const { updatedAt, postCommentBody, writer } = comment;

  return (
    <Wrapper>
      <Nickname>{writer.nickname}</Nickname>
      <Content>{postCommentBody}</Content>
      <CreatedAt>{dateFormat(updatedAt)}</CreatedAt>
    </Wrapper>
  );
}
