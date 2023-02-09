import { useEffect } from 'react';
import styled from 'styled-components';
import usePostStore from '../hooks/usePostStore';
import usePostFormStore from '../hooks/usePostFormStore';
import PostForm from '../components/community/PostForm';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 50em;
`;

export default function PostCreatePage() {
  const postStore = usePostStore();
  const postFormStore = usePostFormStore();

  useEffect(() => {
    postFormStore.reset();
    postStore.reset();
  }, []);

  return (
    <Container>
      <PostForm />
    </Container>
  );
}
