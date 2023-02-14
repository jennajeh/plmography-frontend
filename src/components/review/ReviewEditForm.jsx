/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import useReviewEditFormStore from '../../hooks/useReviewEditFormStore';
import useReviewStore from '../../hooks/useReviewStore';
import Input from '../common/Input';

const Container = styled.div`
  width: 700px;
  height: 400px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 30px;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 600;
  margin: 30px 0;
  color: ${((props) => props.theme.text.white)};
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 15px;
  gap: 5px;
`;

const Button = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 2px;
  border: none;
  margin: 5px;
  color: ${((props) => props.theme.text.white)};
  background-color: ${((props) => props.theme.text.sixthGrey)};
  border-radius: 5px;
`;

export default function ReviewEditForm() {
  const navigate = useNavigate();
  const reviewEditFormStore = useReviewEditFormStore();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();
  const { content } = contentStore;

  const mySameContentReview = reviewStore.isMySameContentReview(content.tmdbId);

  const notDeleted = reviewStore.isDeletedMyReviews(mySameContentReview);

  const tmdbId = mySameContentReview[0]?.contentId;

  const location = useLocation();
  const reviewId = location.pathname?.split('/')[2];

  const handleSubmit = async (e) => {
    e.preventDefault();

    await reviewEditFormStore.validate();

    if (reviewEditFormStore.isValidateSuccessful) {
      const { body, starRate } = reviewEditFormStore;

      await reviewStore.modify(body, starRate, reviewId);

      navigate(`/contents/${tmdbId}`);
    }
  };

  useEffect(() => {
    reviewEditFormStore.fillFields(notDeleted[0]);
  }, []);

  if (!content) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Title>리뷰 수정하기</Title>
        <form onSubmit={handleSubmit}>
          <StarRatings
            rating={reviewEditFormStore.starRate}
            starRatedColor="#0bdfaa"
            starHoverColor="#1f8a6e"
            starDimension="40px"
            starSpacing="15px"
            changeRating={(value) => reviewEditFormStore.changeStarRate(value)}
            isSelectable
          />
          <Input
            width={500}
            height={150}
            name="body"
            type="text"
            value={reviewEditFormStore.body || ''}
            onChange={(e) => reviewEditFormStore.changeBody(e.target.value)}
          />
          <ButtonBox>
            <Button
              type="button"
              onClick={() => navigate(-1)}
            >
              취소하기
            </Button>
            <Button type="submit">
              수정하기
            </Button>
          </ButtonBox>
        </form>
      </Wrapper>
    </Container>
  );
}
