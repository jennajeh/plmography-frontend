import { reviewCommentApiService } from '../services/ReviewCommentApiService';
import ReviewCommentStore from './ReviewCommentStore';

const context = describe;

describe('ReviewCommentStore', () => {
  let reviewCommentStore;

  beforeEach(() => {
    reviewCommentStore = new ReviewCommentStore();
  });

  describe('reset', () => {
    it('모든 변수들을 리셋한다', () => {
      reviewCommentStore.createStatus = 'successful';
      reviewCommentStore.reset();

      expect(reviewCommentStore.createStatus).toBeFalsy();
    });
  });

  describe('create', () => {
    context('댓글을 올바르게 작성했을 때', () => {
      it('createStatus 가 successful 로 바뀐다', async () => {
        const userId = 1;
        const postId = 1;
        const body = '동의합니다';

        await reviewCommentStore.create(userId, postId, body);

        expect(reviewCommentStore.isCreateSuccessful).toBeTruthy();
      });
    });

    context('댓글의 내용이 비어있을 때', () => {
      it('createStatus 가 failed 로 바뀐다', async () => {
        const userId = 1;
        const postId = 1;
        const body = '';

        await reviewCommentStore.create(userId, postId, body);

        expect(reviewCommentStore.isCreateFailed).toBeTruthy();
      });
    });
  });

  describe('fetchComments', () => {
    it('댓글 목록을 출력한다', async () => {
      await reviewCommentStore.fetchComments();

      expect(reviewCommentStore.reviewComments).toHaveLength(2);
    });
  });

  describe('delete', () => {
    context('댓글이 성공적으로 삭제됐을 때', () => {
      it('deleteStatus 가 successful 로 바뀐다', async () => {
        reviewCommentApiService.setAccessToken('ACCESS.TOKEN');

        const commentId = 1;

        await reviewCommentStore.delete(commentId);

        expect(reviewCommentStore.isDeleteSuccessful).toBeTruthy();
      });
    });

    context('when failed to delete', () => {
      it('deleteStatus 가 failed 로 바뀐다', async () => {
        reviewCommentApiService.setAccessToken('');

        const commentId = 1;

        await reviewCommentStore.delete(commentId);

        expect(reviewCommentStore.isDeleteFailed).toBeTruthy();
      });
    });
  });
});
