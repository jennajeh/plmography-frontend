import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import usePostStore from '../hooks/usePostStore';
import usePostCommentStore from '../hooks/usePostCommentStore';
import useUserStore from '../hooks/useUserStore';
import useLikeStore from '../hooks/useLikeStore';
import HotPosts from '../components/community/HotPosts';
import Posts from '../components/community/Posts';
import MyPostInformation from '../components/community/MyPostInformation';

const Container = styled.div`
  min-height: calc(100vh - env(safe-area-inset-bottom) - 56px);
  max-width: 70em;
  margin: 0 auto;
  padding-bottom: calc(env(safe-area-inset-bottom) + 56px);
  overflow: hidden;
`;

const HotPostWrapper = styled.div`
  margin: 1em;
  border-bottom: 1px solid #c9c9c9;
`;

const PostsWrapper = styled.div`
  margin: 1em;
  border-bottom: 1px solid #c9c9c9;
`;

export default function CommunityPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const postStore = usePostStore();
  const postCommentStore = usePostCommentStore();
  const userStore = useUserStore();
  const likeStore = useLikeStore();

  useEffect(() => {
    if (accessToken === '') {
      userStore.fetchUsers();
      postStore.fetchHitPosts();
      likeStore.fetchLikes();

      return;
    }

    userStore.fetchMe();
    userStore.fetchUsers();
    postStore.fetchHitPosts();
    postStore.fetchMyPosts();
    likeStore.fetchLikes();
    postCommentStore.fetchMyComments();
  }, []);

  return (
    <Container>
      <HotPostWrapper>
        <HotPosts />
      </HotPostWrapper>
      <PostsWrapper>
        <Posts />
        <MyPostInformation />
      </PostsWrapper>
    </Container>
  );
}
