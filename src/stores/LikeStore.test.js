import LikeStore from './LikeStore';

const context = describe;

describe('LikeStore', () => {
  let likeStore;

  beforeEach(() => {
    likeStore = new LikeStore();
  });

  describe('fetchLikes', () => {
    it('좋아요를 누른 유저의 아이디를 알 수 있다.', async () => {
      await likeStore.fetchLikes();

      expect(likeStore.likes[0].userId).toBe(1);
    });

    it('좋아요가 눌린 게시글의 번호를 알 수 있다.', async () => {
      await likeStore.fetchLikes();

      expect(likeStore.likes[0].postId).toBe(10);
    });
  });

  describe('countLike', () => {
    context('좋아요 클릭에 성공한 경우', () => {
      it('likeStatus 가 successful 로 바뀐다', async () => {
        const postId = 1;
        const userId = 1;

        await likeStore.countLike(postId, userId);

        expect(likeStore.isLikeStatusSuccessful).toBeTruthy();
      });
    });

    context('좋아요 클릭에 실패한 경우', () => {
      it('likeStatus 가 failed 로 바뀐다', async () => {
        const postId = '';
        const userId = 1;

        await likeStore.countLike(postId, userId);

        expect(likeStore.isLikeStatusFailed).toBeTruthy();
      });
    });
  });

  describe('delete', () => {
    context('좋아요 취소에 성공한 경우', () => {
      it('cancelLikeStatus 가 successful 로 바뀐다', async () => {
        const checkedPosts = [1, 2];

        await likeStore.cancelLike(checkedPosts);

        expect(likeStore.isCancelLikeStatusSuccessful).toBeTruthy();
      });
    });

    context('좋아요 취소에 실패한 경우', () => {
      it('cancelLikeStatus 가 failed 로 바뀐다', async () => {
        const checkedPosts = [];

        await likeStore.cancelLike(checkedPosts);

        expect(likeStore.isCancelLikeStatusFailed).toBeTruthy();
      });
    });
  });

  describe('reset', () => {
    it('모든 필드를 리셋시킨다', () => {
      likeStore.likeStatus = 'successful';
      likeStore.reset();

      expect(likeStore.likeStatus).toBeFalsy();
    });
  });
});
