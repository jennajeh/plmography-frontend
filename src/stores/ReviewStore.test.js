import { reviewApiService } from '../services/ReviewApiService';
import ReviewStore from './ReviewStore';

const context = describe;

describe('ReviewStore', () => {
  let reviewStore;

  beforeEach(() => {
    reviewStore = new ReviewStore();
  });

  describe('fetchReviews', () => {
    it('리뷰 목록을 출력한다', async () => {
      await reviewStore.fetchReviews({ page: 1, size: 5 });

      expect(reviewStore.reviews[0].reviewBody).toBe('너무 너무 재미있어요!');
      expect(reviewStore.totalPages).toBe(1);
    });
  });

  describe('fetchMyReviews', () => {
    it('내가 쓴 리뷰 목록을 출력한다', async () => {
      await reviewStore.fetchMyReviews();

      expect(reviewStore.myReviews).toBeTruthy();
      expect(reviewStore.myReviews[0].reviewBody).toBe('오랜만에 힐링함');
      expect(reviewStore.myReviews[1].reviewBody).toBe('나의 인생작!');
    });
  });

  describe('create', () => {
    context('리뷰 등록에 성공한 경우', () => {
      it('createStatus 가 successful 로 바뀐다', async () => {
        const contentId = 1;
        const starRate = 4;
        const reviewBody = '정말 재미있었습니다!';

        await reviewStore.create(contentId, starRate, reviewBody);

        expect(reviewStore.isCreateSuccessful).toBeTruthy();
      });
    });

    context('리뷰 등록에 실패한 경우', () => {
      it('createStatus 가 failed 로 바뀐다', async () => {
        const contentId = 1;
        const starRate = 4;
        const reviewBody = '';

        await reviewStore.create(contentId, starRate, reviewBody);

        expect(reviewStore.isCreateFailed).toBeTruthy();
      });
    });
  });

  describe('modify', () => {
    context('리뷰 수정에 성공한 경우', () => {
      it('modifyStatus 가 successful 로 바뀐다', async () => {
        await reviewStore.fetchMyReviews();

        const reviewBody = '오랜만에 힐링함';

        await reviewStore.modify(reviewBody, 1);

        expect(reviewStore.isModifySuccessful).toBeTruthy();
      });
    });

    context('리뷰 수정에 실패한 경우', () => {
      it('modifyStatus 가 failed 로 바뀐다', async () => {
        await reviewStore.fetchMyReviews();

        const reviewBody = '';

        await reviewStore.modify(reviewBody, 1);

        expect(reviewStore.isModifyFailed).toBeTruthy();
      });
    });
  });

  describe('delete', () => {
    context('리뷰 삭제에 성공한 경우', () => {
      it('deleteStatus 가 successful 로 바뀐다', async () => {
        reviewApiService.setAccessToken('ACCESS.TOKEN');

        const postId = 1;

        await reviewStore.delete(postId);

        expect(reviewStore.isDeleteSuccessful).toBeTruthy();
      });
    });

    context('리뷰 삭제에 실패한 경우', () => {
      it('deleteStatus 가 failed 로 바뀐다', async () => {
        reviewApiService.setAccessToken('');

        const postId = 1;

        await reviewStore.delete(postId);

        expect(reviewStore.isDeleteFailed).toBeTruthy();
      });
    });
  });

  describe('reset', () => {
    it('모든 필드를 리셋시킨다', () => {
      reviewStore.createStatus = 'successful';
      reviewStore.reset();

      expect(reviewStore.createStatus).toBeFalsy();
    });
  });
});
