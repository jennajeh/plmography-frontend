/* eslint-disable max-len */
import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import ReviewEditForm from '../components/review/ReviewEditForm';
import useContentStore from '../hooks/useContentStore';
import useReviewStore from '../hooks/useReviewStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 50em;
`;

export default function ReviewEditPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const reviewStore = useReviewStore();
  const userStore = useUserStore();
  const contentStore = useContentStore();
  const { content } = contentStore;

  useEffect(() => {
    reviewStore.fetchMyReviews();
    userStore.fetchMe();
  }, []);

  if (!accessToken
    || (!reviewStore.isReviewLoading && !reviewStore.isMySameContentReview(Number(content.tmdbId)))) {
    return (
      <Container>
        <p>
          잘못된 접근입니다.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <ReviewEditForm />
    </Container>
  );
}
