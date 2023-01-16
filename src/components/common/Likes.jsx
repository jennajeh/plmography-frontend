import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LikeButton = styled.button`
  cursor: pointer;
`;

export default function Likes({ count, onClick }) {
  return (
    <Wrapper>
      <p>{count}</p>
      <LikeButton type="button" name="like" onClick={onClick}>
        좋아요
      </LikeButton>
    </Wrapper>
  );
}
