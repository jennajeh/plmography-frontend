import { useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import usePostStore from '../hooks/usePostStore';
import usePostCommentStore from '../hooks/usePostCommentStore';
import useUserStore from '../hooks/useUserStore';
import TopRankPosts from '../components/community/TopRankPosts';

const Container = styled.div`
  min-height: calc(100vh - env(safe-area-inset-bottom) - 56px);
  max-width: 70em;
  margin: 0 auto;
  padding-bottom: calc(env(safe-area-inset-bottom) + 56px);
  overflow: hidden;
`;

export default function CommunityPage() {
  const postStore = usePostStore();
  const postCommentStore = usePostCommentStore();
  const userStore = useUserStore();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    userStore.fetchMe();
    userStore.fetchUsers();
    postStore.fetchHitPosts();
    postStore.fetchMyPosts();
    postCommentStore.fetchMyComments();
  }, []);

  return (
    <Container>
      <TopRankPosts />
      {/* <Posts /> */}
      {/* <MyPostInformation /> */}
    </Container>
  );
}
