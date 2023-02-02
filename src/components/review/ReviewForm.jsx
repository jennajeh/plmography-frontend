/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import StarRatings from 'react-star-ratings';
import Input from '../common/Input';

import useReviewStore from '../../hooks/useReviewStore';
import useReviewFormStore from '../../hooks/useReviewFormStore';
import useContentStore from '../../hooks/useContentStore';

const Container = styled.div`
  width: 30em;
`;

const RateSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 1.5em;
  label {
    color: #A0A0A0;
    font-weight: 400;
    width: 70px;
    margin-bottom: .5em;
  }
  select {
    width: 200px;
    height: 40px;
    padding-inline: .5em;
    border: 1px #A0A0A0 solid;
  }
`;

const Error = styled.p`
  font-size: .9em;
  color: #ff0000;
  margin-top: .7em;
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

  // const handleRateChange = (e) => {
  //   const selectedRate = e.target.value;
  //   reviewFormStore.setStarRate(selectedRate);

  //   reviewFormStore.validateStarRate();
  // };

  const handleClickCancel = () => {
    reviewFormStore.reset();
    reviewStore.reset();

    navigate(-1);
  };

  return (
    <Container>
      <h1>리뷰 작성하기</h1>
      <form onSubmit={handleSubmit}>
        <StarRatings
          rating={starRate}
          starRatedColor="#ffc501"
          starHoverColor="#ffe899"
          starDimension="40px"
          starSpacing="15px"
          changeRating={(value) => reviewFormStore.changeStarRate(value)}
          isSelectable
        />
        <span>
          {starRate}
          점
        </span>
        {/* <RateSection>
          <label htmlFor="rate-select">평점</label>
          <select id="rate-select" onChange={handleRateChange}>
            <option defaultValue hidden>선택</option>
            <option>⭐️⭐️⭐️⭐️⭐️</option>
            <option>⭐️⭐️⭐️⭐️</option>
            <option>⭐️⭐️⭐️</option>
            <option>⭐️⭐️</option>
            <option>⭐️</option>
          </select>
          {reviewFormStore.isRateEmpty && (
            <Error>{reviewFormStore.errors.starRate}</Error>
          )}
        </RateSection> */}
        <Input
          name="body"
          label="리뷰 내용"
          type="text"
          value={reviewFormStore.body || ''}
          onChange={(e) => reviewFormStore.changeBody(e.target.value)}
          errorMessage={reviewFormStore.errors.body}
        />
        <button type="submit">등록하기</button>
        <button type="button" onClick={handleClickCancel}>취소하기</button>
      </form>
    </Container>
  );
}
