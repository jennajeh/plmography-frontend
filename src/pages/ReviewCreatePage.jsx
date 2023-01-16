import { useEffect } from 'react';
import styled from 'styled-components';
import ReviewForm from '../components/review/ReviewForm';
import useReviewFormStore from '../hooks/useReviewFormStore';
import useReviewStore from '../hooks/useReviewStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 50em;
`;

export default function ReviewCreatePage() {
  const reviewStore = useReviewStore();
  const reviewFormStore = useReviewFormStore();

  useEffect(() => {
    reviewFormStore.reset();
    reviewStore.reset();
  }, []);

  return (
    <Container>
      <ReviewForm />
    </Container>
  );
}
