/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import useContentStore from '../../hooks/useContentStore';
import useReviewEditFormStore from '../../hooks/useReviewEditFormStore';
import useReviewStore from '../../hooks/useReviewStore';
import Input from '../common/Input';

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

  return (
    <form onSubmit={handleSubmit}>
      <StarRatings
        rating={reviewEditFormStore.starRate}
        starRatedColor="#ffc501"
        starHoverColor="#ffe899"
        starDimension="40px"
        starSpacing="15px"
        changeRating={(value) => reviewEditFormStore.changeStarRate(value)}
        isSelectable
      />
      <span>
        {reviewEditFormStore.starRate}
        점
      </span>
      <Input
        name="body"
        label="내가 쓴 리뷰 수정"
        type="text"
        value={reviewEditFormStore.body || ''}
        onChange={(e) => reviewEditFormStore.changeBody(e.target.value)}
      />
      <button type="button" onClick={() => navigate(-1)}>
        취소하기
      </button>
      <button type="submit">
        수정하기
      </button>
    </form>
  );
}
