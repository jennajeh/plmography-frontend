import { reviewApiService } from '../services/ReviewApiService';
import ReviewStore from './ReviewStore';

const context = describe;

describe('ReviewStore', () => {
  let reviewStore;

  beforeEach(() => {
    reviewStore = new ReviewStore();
  });

  describe('create', () => {
    context('리뷰 등록에 성공한 경우', () => {
      it('createStatus 가 successful 로 바뀐다', async () => {
        const contentId = 1;
        const starRate = 4;
        const reviewBody = '정말 재미있었습니다!';

        await reviewStore.create({
          contentId, starRate, reviewBody,
        });

        expect(reviewStore.isCreateSuccessful).toBeTruthy();
      });
    });

    context('리뷰 등록에 실패한 경우', () => {
      it('createStatus 가 failed 로 바뀐다', async () => {
        const contentId = 1;
        const starRate = 4;
        const reviewBody = '';

        await reviewStore.create({
          contentId, starRate, reviewBody,
        });

        expect(reviewStore.isCreateFailed).toBeTruthy();
      });
    });
  });

  describe('modify', () => {
    context('리뷰 수정에 성공한 경우', () => {
      it('modifyStatus 가 successful 로 바뀐다', async () => {
        await reviewStore.fetchReview(1);

        const reviewBody = '오랜만에 힐링함';

        await reviewStore.modify({
          reviewBody,
        });

        expect(reviewStore.isModifySuccessful).toBeTruthy();
      });
    });

    context('리뷰 수정에 실패한 경우', () => {
      it('modifyStatus 가 failed 로 바뀐다', async () => {
        await reviewStore.fetchReview(1);

        const reviewBody = '';

        await reviewStore.modify({
          reviewBody,
        });

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

  describe('isMyReview', () => {
    context('리뷰가 본인이 쓴 글이면', () => {
      it('true 를 반환한다', async () => {
        const postId = 1;
        const userId = 1;

        await reviewStore.fetchReview(postId);

        expect(reviewStore.isMyReview(userId)).toBeTruthy();
      });
    });

    context('리뷰가 본인이 쓴 글이 아니면', () => {
      it('false 를 반환한다', async () => {
        const postId = 1;
        const userId = 2;

        await reviewStore.fetchReview(postId);

        expect(reviewStore.isMyReview(userId)).toBeFalsy();
      });
    });
  });
});
