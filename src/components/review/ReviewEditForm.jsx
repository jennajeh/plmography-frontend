import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useContentStore from '../../hooks/useContentStore';
import useReviewFormStore from '../../hooks/useReviewFormStore';
import useReviewStore from '../../hooks/useReviewStore';

export default function ReviewEditForm() {
  const navigate = useNavigate();
  const reviewFormStore = useReviewFormStore();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();
  const { myReviews } = reviewStore;
  const { content } = contentStore;

  const mySameContentReview = reviewStore.isMySameContentReview(Number(content.tmdbId));

  console.log('@@', mySameContentReview);
  console.log('##########', myReviews);

  const tmdbId = mySameContentReview[0].contentId;

  console.log(tmdbId);

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
    reviewFormStore.fillFields(mySameContentReview[0]);
  }, []);

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
        <button type="button" onClick={() => navigate(-1)}>
          취소하기
        </button>
        <button type="submit">
          수정하기
        </button>
      </form>
    </>
  );
}
