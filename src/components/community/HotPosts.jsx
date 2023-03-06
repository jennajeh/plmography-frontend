import styled from 'styled-components';
import usePostStore from '../../hooks/usePostStore';
import Title from '../common/Title';
import HotPost from './HotPost';

const Container = styled.div`
  border-bottom: solid 1px #5e677c;
  padding-bottom: 1rem;
`;
const List = styled.ul`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1em;
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  color: white;
  text-align: center;
`;

export default function HotPosts() {
  const postStore = usePostStore();

  const { hitPosts } = postStore;

  if (!hitPosts) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title size={25} weight={600}>
        인기글
      </Title>
      {hitPosts.length ? (
        <List>
          {hitPosts.map((hitPost) => (
            <HotPost
              key={hitPost.id}
              hitPost={hitPost}
            />
          ))}
        </List>
      ) : (
        <Error>작품이 존재하지 않습니다.</Error>
      )}
    </Container>
  );
}
