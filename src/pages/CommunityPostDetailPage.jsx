import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import PostDetail from '../components/community/PostDetail';
import useLikeStore from '../hooks/useLikeStore';
import usePostCommentStore from '../hooks/usePostCommentStore';
import usePostStore from '../hooks/usePostStore';
import useUserStore from '../hooks/useUserStore';

export default function CommunityPostDetailPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const postStore = usePostStore();
  const postCommentStore = usePostCommentStore();
  const userStore = useUserStore();
  const likeStore = useLikeStore();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;
  const path = location.pathname;
  const postId = path.split('/')[3];

  useEffect(() => {
    if (accessToken === '') {
      userStore.fetchUsers();
      likeStore.fetchLikes();

      return;
    }

    userStore.fetchMe();
    userStore.fetchUsers();
    likeStore.fetchLikes();
  }, []);

  useEffect(() => {
    postStore.fetchPost(postId);
  }, [postId]);

  useEffect(() => {
    postCommentStore.fetchComments({ page, size: 10, postId });
  }, [page, postId]);

  return (
    <div>
      <PostDetail />
    </div>
  );
}
