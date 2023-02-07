import styled from 'styled-components';
import usePostStore from '../../hooks/usePostStore';
import HitPost from './HitPost';

const Title = styled.h1`
  display: flex;
  font-size: ${((props) => props.theme.size.h4)};
  font-weight: bold;
  margin-top: 1em;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1em;
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  text-align: center;
`;

export default function TopRankPosts() {
  const postStore = usePostStore();

  const { hitPosts } = postStore;
  console.log(hitPosts);

  if (!hitPosts) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      <Title>인기글 🔥</Title>
      {hitPosts.length ? (
        <List>
          {hitPosts.map((hitPost) => (
            <HitPost
              key={hitPost.id}
              hitPost={hitPost}
            />
          ))}
        </List>
      ) : (
        <Error>작품이 존재하지 않습니다.</Error>
      )}
    </div>
  );
}
