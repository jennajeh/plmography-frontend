import styled from 'styled-components';
import usePostStore from '../../hooks/usePostStore';
import HotPost from '../community/HotPost';

const Title = styled.h1`
  color: ${((props) => props.theme.text.white)};
  font-size: 26px;
  font-weight: bold;
  margin: 5px 0 20px 0;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 0 100px 0;
  gap: 1em;
`;

const Error = styled.p`
  margin: 80px;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`;

export default function HomeCommunity() {
  const postStore = usePostStore();

  const { hitPosts } = postStore;

  let count = 1;

  if (!hitPosts) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      <Title>커뮤니티 인기글 🔥</Title>
      {hitPosts.length ? (
        <List>
          {hitPosts.map((hitPost) => (
            <HotPost
              key={hitPost.id}
              hitPost={hitPost}
              count={count++}
            />
          ))}
        </List>
      ) : (
        <Error>작품이 존재하지 않습니다.</Error>
      )}
    </div>
  );
}
