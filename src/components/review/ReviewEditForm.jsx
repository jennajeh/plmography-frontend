import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useReviewFormStore from '../../hooks/useReviewFormStore';
import useReviewStore from '../../hooks/useReviewStore';

export default function ReviewEditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const reviewFormStore = useReviewFormStore();
  const reviewStore = useReviewStore();
  const { body } = reviewFormStore;

  const handleClickSubmit = async (e) => {
    e.preventDefault();

    await reviewFormStore.validate();

    if (reviewFormStore.isValidateSuccessful) {
      await reviewStore.modify({ body });

      navigate(`/contents/${id}`);
    }
  };

  useEffect(() => {
    if (reviewStore.review) {
      reviewFormStore.fillFields(reviewStore.review);
    }
  }, [reviewStore.review]);

  if (!reviewStore.review) {
    return null;
  }

  return (
    <>
      <h3>내가 쓴 리뷰</h3>
      <form onSubmit={handleClickSubmit}>
        <textarea
          name="input-review"
          value={reviewFormStore.body || ''}
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
