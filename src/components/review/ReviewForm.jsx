/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import StarRatings from 'react-star-ratings';
import Input from '../common/Input';

import useReviewStore from '../../hooks/useReviewStore';
import useReviewFormStore from '../../hooks/useReviewFormStore';
import useContentStore from '../../hooks/useContentStore';

const Container = styled.div`
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
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

export default function ReviewForm() {
  const navigate = useNavigate();
  const contentStore = useContentStore();
  const reviewStore = useReviewStore();
  const reviewFormStore = useReviewFormStore();

  const { content } = contentStore;
  const contentId = content.tmdbId;

  const { body, starRate } = reviewFormStore;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await reviewFormStore.validate();

    if (!reviewFormStore.isValidateSuccessful) {
      return;
    }

    await reviewStore.create(contentId, starRate, body);

    navigate(`/contents/${contentId}`);
  };

  const handleClickCancel = () => {
    reviewFormStore.reset();
    reviewStore.reset();

    navigate(-1);
  };

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Wrapper>
        <Title>리뷰 작성하기</Title>
        <form onSubmit={handleSubmit}>
          <StarRatings
            rating={starRate}
            starRatedColor="#0bdfaa"
            starHoverColor="#1f8a6e"
            starDimension="40px"
            starSpacing="15px"
            changeRating={(value) => reviewFormStore.changeStarRate(value)}
            isSelectable
          />
          <Input
            width={500}
            height={150}
            name="body"
            type="text"
            value={reviewFormStore.body || ''}
            onChange={(e) => reviewFormStore.changeBody(e.target.value)}
            errorMessage={reviewFormStore.errors.body}
          />
          <ButtonBox>
            <Button type="submit">등록하기</Button>
            <Button type="button" onClick={handleClickCancel}>취소하기</Button>
          </ButtonBox>
        </form>
      </Wrapper>
    </Container>
  );
}
