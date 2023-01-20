import { commentApiService } from '../services/CommentApiService';
import CommentStore from './CommentStore';

const context = describe;

describe('QuestionFormStore', () => {
  let commentStore;

  beforeEach(() => {
    commentStore = new CommentStore();
  });

  describe('reset', () => {
    it('모든 변수들을 리셋한다', () => {
      commentStore.createStatus = 'successful';
      commentStore.reset();

      expect(commentStore.createStatus).toBeFalsy();
    });
  });

  describe('create', () => {
    context('댓글을 올바르게 작성했을 때', () => {
      it('createStatus 가 successful 로 바뀐다', async () => {
        const userId = 1;
        const postId = 1;
        const body = '동의합니다';

        await commentStore.create(userId, postId, body);

        expect(commentStore.isCreateSuccessful).toBeTruthy();
      });
    });

    context('댓글의 내용이 비어있을 때', () => {
      it('createStatus 가 failed 로 바뀐다', async () => {
        const userId = 1;
        const postId = 1;
        const body = '';

        await commentStore.create(userId, postId, body);

        expect(commentStore.isCreateFailed).toBeTruthy();
      });
    });
  });

  describe('fetchComments', () => {
    it('리뷰 목록을 출력한다', async () => {
      await commentStore.fetchComments();

      expect(commentStore.comments).toHaveLength(2);
    });
  });

  describe('delete', () => {
    context('댓글이 성공적으로 삭제됐을 때', () => {
      it('deleteStatus 가 successful 로 바뀐다', async () => {
        commentApiService.setAccessToken('ACCESS.TOKEN');

        const commentId = 1;

        await commentStore.delete(commentId);

        expect(commentStore.isDeleteSuccessful).toBeTruthy();
      });
    });

    context('when failed to delete', () => {
      it('deleteStatus 가 failed 로 바뀐다', async () => {
        commentApiService.setAccessToken('');

        const commentId = 1;

        await commentStore.delete(commentId);

        expect(commentStore.isDeleteFailed).toBeTruthy();
      });
    });
  });
});
