import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import usePostStore from '../../hooks/usePostStore';
import Pagination from '../page/Pagination';
import PostItem from './PostItem';

const Container = styled.div`
  
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.ul`
  display: flex;
  width: 700px;
  flex-direction: column;
  gap: 20px;

  
  
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  text-align: center;
`;

export default function PostList() {
  const postStore = usePostStore();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { posts } = postStore;

  if (!posts) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <Container>
      {posts.length ? (
        <Wrapper>
          <List>
            {posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
              />
            ))}
          </List>
          <Pagination
            url={location.pathname}
            total={postStore.totalPages}
            current={searchParams.get('page') ?? 1}
          />
        </Wrapper>
      ) : (
        <Error>게시물이 존재하지 않습니다.</Error>
      )}
    </Container>
  );
}
