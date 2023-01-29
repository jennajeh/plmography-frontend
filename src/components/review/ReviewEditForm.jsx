/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

  const mySameContentReview = reviewStore.isMySameContentReview(Number(content.tmdbId));

  const notDeleted = reviewStore.isDeletedMyReviews(mySameContentReview);

  const tmdbId = mySameContentReview[0]?.contentId;

  const location = useLocation();
  const reviewId = location.pathname?.split('/')[2];

  const handleClickSubmit = async (e) => {
    e.preventDefault();

    await reviewEditFormStore.validate();

    if (reviewEditFormStore.isValidateSuccessful) {
      const { body } = reviewEditFormStore;

      await reviewStore.modify(body, reviewId);

      navigate(`/contents/${tmdbId}`);
    }
  };

  useEffect(() => {
    reviewEditFormStore.fillFields(notDeleted[0]);
  }, []);

  return (
    <form onSubmit={handleClickSubmit}>
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
