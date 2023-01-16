import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useReviewFormStore from '../../hooks/useReviewFormStore';
import useReviewStore from '../../hooks/useReviewStore';

export default function ReviewEditForm() {
  const navigate = useNavigate();
  const reviewFormStore = useReviewFormStore();
  const reviewStore = useReviewStore();
  const { review } = reviewStore;

  const tmdbId = review.contentId;

  const location = useLocation();
  const reviewId = location.pathname.split('/')[2];

  const handleClickSubmit = async (e) => {
    e.preventDefault();

    await reviewFormStore.validate();

    if (reviewFormStore.isValidateSuccessful) {
      const { body } = reviewFormStore;

      await reviewStore.modify(body, reviewId);

      navigate(`/contents/${tmdbId}`);
    }
  };

  useEffect(() => {
    reviewFormStore.fillFields(review);
  }, [review]);

  return (
    <>
      <h3>내가 쓴 리뷰 수정</h3>
      <form onSubmit={handleClickSubmit}>
        <textarea
          name="input-review"
          type="text"
          value={reviewFormStore.body}
          onChange={(e) => reviewFormStore.changeBody(e.target.value)}
        />
        <button type="button">
          취소하기
        </button>
        <button type="submit">
          수정하기
        </button>
      </form>
    </>
  );
}
