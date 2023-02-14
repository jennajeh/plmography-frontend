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

const PostsWrapper = styled.div`
  display: grid;
  grid-template-columns: 6fr 3fr;
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
    <div>
      <div>
        <HotPosts />
      </div>
      <PostsWrapper>
        <Posts />
        <MyPostInformation />
      </PostsWrapper>
    </div>
  );
}
