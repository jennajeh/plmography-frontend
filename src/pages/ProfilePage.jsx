import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useContentStore from '../hooks/useContentStore';
import useUserStore from '../hooks/useUserStore';
import useReviewStore from '../hooks/useReviewStore';
import useSubscribeStore from '../hooks/useSubscribeStore';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

export default function ProfilePage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const userStore = useUserStore();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();
  const subscribeStore = useSubscribeStore();

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
    userStore.fetchUsers();
    userStore.fetchMe();
    reviewStore.fetchMyReviews();
    subscribeStore.fetchMySubscribeCount();
  }, []);

  useEffect(() => {
    subscribeStore.fetchUserSubscribeCount(id);
  }, [id]);

  useEffect(() => {
    subscribeStore.fetchFollowingList({ id, page, size: 10 });
    subscribeStore.fetchFollowerList({ id, page, size: 10 });
  }, [page]);

  return (
    <div>ProfilePage</div>
  );
}
