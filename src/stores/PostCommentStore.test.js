import { postCommentApiService } from '../services/PostCommentApiService';
import PostCommentStore from './PostCommentStore';

const context = describe;

describe('PostCommentFormStore', () => {
  let postCommentStore;

  beforeEach(() => {
    postCommentStore = new PostCommentStore();
  });

  describe('reset', () => {
    it('모든 필드를 리셋한다', () => {
      postCommentStore.createStatus = 'successful';
      postCommentStore.reset();

      expect(postCommentStore.createStatus).toBeFalsy();
    });
  });

  describe('create', () => {
    context('댓글을 올바르게 작성했을 때', () => {
      it('createStatus 가 successful 로 바뀐다', async () => {
        const postId = 1;
        const postCommentBody = '동의합니다';

        await postCommentStore.create(postId, postCommentBody);

        expect(postCommentStore.isCreateSuccessful).toBeTruthy();
      });
    });

    context('댓글의 내용이 비어있을 때', () => {
      it('createStatus 가 failed 로 바뀐다', async () => {
        const postId = 1;
        const postCommentBody = '';

        await postCommentStore.create(postId, postCommentBody);

        expect(postCommentStore.isCreateFailed).toBeTruthy();
      });
    });
  });

  describe('fetchComments', () => {
    it('댓글 목록을 출력한다', async () => {
      await postCommentStore.fetchComments({ page: 1, size: 5, postId: 1 });

      expect(postCommentStore.postComments).toHaveLength(2);
    });
  });

  describe('fetchMyComments', () => {
    it('내가 쓴 댓글 목록을 출력한다', async () => {
      await postCommentStore.fetchMyComments();

      expect(postCommentStore.myPostComments).toBeTruthy();
      expect(postCommentStore.myPostComments[0].postCommentBody).toBe('잘 보고 오셨네요');
    });
  });

  describe('delete', () => {
    context('댓글 삭제에 성공한 경우', () => {
      it('deleteStatus 가 successful 로 바뀐다', async () => {
        postCommentApiService.setAccessToken('ACCESS.TOKEN');

        const commentId = 1;

        await postCommentStore.delete(commentId);

        expect(postCommentStore.isDeleteSuccessful).toBeTruthy();
      });
    });

    context('댓글 삭제에 실패한 경우', () => {
      it('deleteStatus 가 failed 로 바뀐다', async () => {
        postCommentApiService.setAccessToken('');

        const commentId = 1;

        await postCommentStore.delete(commentId);

        expect(postCommentStore.isDeleteFailed).toBeTruthy();
      });
    });
  });
});
