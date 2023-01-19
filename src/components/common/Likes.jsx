import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default function Likes({ count, onClick }) {
  return (
    <Wrapper>
      <p>
        {count}
        개
      </p>
      <button type="button" name="like" onClick={onClick}>
        좋아요
      </button>
    </Wrapper>
  );
}
