import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useContentStore from '../hooks/useContentStore';
import useUserStore from '../hooks/useUserStore';
import useReviewStore from '../hooks/useReviewStore';
import useSubscribeStore from '../hooks/useSubscribeStore';
import MyProfile from '../components/profile/MyProfile';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

export default function MyProfilePage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const [searchParams] = useSearchParams();
  const userStore = useUserStore();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();
  const subscribeStore = useSubscribeStore();

  const { user } = userStore;
  const {
    id: userId, favoriteContentIds, watchedContentIds, wishContentIds,
  } = user;
  const favoriteContentId = favoriteContentIds?.join(',');
  const watchedContentId = watchedContentIds?.join(',');
  const wishContentId = wishContentIds?.join(',');
  const page = searchParams.get('page') ?? 1;

  if (!accessToken || !userStore.user) {
    return (
      <Container>
        <p>
          잘못된 접근입니다.
        </p>
      </Container>
    );
  }

  useEffect(() => {
    userStore.fetchMe();
    userStore.fetchUsers();
    reviewStore.fetchMyReviews();
    subscribeStore.fetchMySubscribeCount();
  }, []);

  useEffect(() => {
    if (userId) {
      subscribeStore.fetchFollowingList({ userId, page, size: 10 });
      subscribeStore.fetchFollowerList({ userId, page, size: 10 });
    }
  }, [userId, page]);

  useEffect(() => {
    if (userId && favoriteContentId) {
      contentStore.fetchFavoriteContents({ userId, favoriteContentId });
    }
  }, [userId, favoriteContentId]);

  useEffect(() => {
    if (userId && watchedContentId) {
      contentStore.fetchWatchedContents({ userId, watchedContentId });
    }
  }, [userId, watchedContentId]);

  useEffect(() => {
    if (userId && wishContentId) {
      contentStore.fetchWishContents({ userId, wishContentId });
    }
  }, [userId, wishContentId]);

  return (
    <MyProfile />
  );
}
