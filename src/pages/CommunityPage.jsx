import { useEffect } from 'react';
import styled from 'styled-components';
import usePostStore from '../hooks/usePostStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  min-height: calc(100vh - env(safe-area-inset-bottom) - 56px);
  max-width: 70em;
  margin: 0 auto;
  padding-bottom: calc(env(safe-area-inset-bottom) + 56px);
  overflow: hidden;
`;

const Title = styled.h1`
  display: flex;
  font-size: ${((props) => props.theme.size.h4)};
  font-weight: bold;
  margin-top: 1em;
`;

export default function CommunityPage() {
  const postStore = usePostStore();
  const userStore = useUserStore();

  useEffect(() => {
    postStore.fetchHitPosts();
    postStore.fetchMyPosts();
    userStore.fetchUsers();
    userStore.fetchMe();
    // 코멘트 스토어
  }, []);

  return (
    <Container>
      <Title>인기글 🔥</Title>
    </Container>
  );
}
