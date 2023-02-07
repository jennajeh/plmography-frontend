import { postApiService } from '../services/PostApiService';
import PostStore from './PostStore';

const context = describe;

describe('PostStore', () => {
  let postStore;

  beforeEach(() => {
    postStore = new PostStore();
  });

  describe('게시물 목록 조회', () => {
    context('게시물 목록 조회시', () => {
      it('게시물 목록이 보인다', async () => {
        await postStore.fetchPosts({
          page: 1,
          size: 10,
          filter: {},
        });

        expect(postStore.posts[0].title).toBe('아바타 보고 왔습니다.');
        expect(postStore.totalPages).toBe(1);
      });
    });

    context('특정 게시물 클릭시', () => {
      it('게시물 상세 정보가 보인다', async () => {
        await postStore.fetchPost(1);

        expect(postStore.post.title).toBe('아바타 보고 왔습니다.');
        expect(postStore.post.postBody).toBe('영상미 대박이예요');
      });
    });
  });

  describe('fetchHitPosts', () => {
    it('조회수가 가장 높은 상위 3개의 테마를 출력한다', async () => {
      await postStore.fetchHitPosts();

      expect(postStore.hitPosts).toBeTruthy();
      expect(postStore.hitPosts[0].writer.nickname).toBe('jenna');
      expect(postStore.hitPosts[1].writer.nickname).toBe('boni');
    });
  });

  describe('updateHit', () => {
    context('조회수 증가에 성공한 경우', () => {
      it('updateHitStatus 가 successful 로 바뀐다', async () => {
        const postId = 1;

        await postStore.updateHit(postId);

        expect(postStore.isUpdateHitSuccessful).toBeTruthy();
      });
    });

    context('조회수 증가에 실패한 경우', () => {
      it('updateHitStatus 가 failed 로 바뀐다', async () => {
        const postId = '';

        await postStore.updateHit(postId);

        expect(postStore.isUpdateHitFailed).toBeTruthy();
      });
    });
  });

  describe('fetchMyPosts', () => {
    it('내가 쓴 게시물 목록을 출력한다', async () => {
      await postStore.fetchMyPosts();

      expect(postStore.myPosts).toBeTruthy();
      expect(postStore.myPosts[0].id).toBe(1);
      expect(postStore.myPosts[0].writer.nickname).toBe('jenna');
      expect(postStore.myPosts[0].title).toBe('아바타 보고 왔습니다.');
    });
  });

  describe('create', () => {
    context('게시물 등록에 성공한 경우', () => {
      it('createStatus 가 successful 로 바뀐다', async () => {
        const title = '첫 번째 게시글';
        const postBody = '반갑습니다!';
        const image = '';

        await postStore.create(title, postBody, image);

        expect(postStore.isCreateSuccessful).toBeTruthy();
      });
    });

    context('게시물 등록에 실패한 경우', () => {
      it('createStatus 가 failed 로 바뀐다', async () => {
        const title = '';
        const postBody = '반갑습니다!';
        const image = '';

        await postStore.create(title, postBody, image);

        expect(postStore.isCreateFailed).toBeTruthy();
      });
    });
  });

  describe('modify', () => {
    context('게시물 수정에 성공한 경우', () => {
      it('modifyStatus 가 successful 로 바뀐다', async () => {
        await postStore.fetchMyPosts();

        const postId = 1;
        const title = '영화관 안 간지 오래 됨';
        const postBody = '티켓 가격이 너무 비싸졌어요';
        const image = 'image.jpg';

        await postStore.modify(postId, title, postBody, image);

        expect(postStore.isModifySuccessful).toBeTruthy();
      });
    });

    context('게시물 수정에 실패한 경우', () => {
      it('modifyStatus 가 failed 로 바뀐다', async () => {
        await postStore.fetchMyPosts();

        const postId = 1;
        const title = '';
        const postBody = '티켓 가격이 너무 비싸졌어요';
        const image = 'image.jpg';

        await postStore.modify(postId, title, postBody, image);

        expect(postStore.isModifyFailed).toBeTruthy();
      });
    });
  });

  describe('delete', () => {
    context('게시물 삭제에 성공한 경우', () => {
      it('deleteStatus 가 successful 로 바뀐다', async () => {
        postApiService.setAccessToken('ACCESS.TOKEN');

        const postId = 1;

        await postStore.delete(postId);

        expect(postStore.isDeleteSuccessful).toBeTruthy();
      });
    });

    context('게시물 삭제에 실패한 경우', () => {
      it('deleteStatus 가 failed 로 바뀐다', async () => {
        postApiService.setAccessToken('');

        const postId = 1;

        await postStore.delete(postId);

        expect(postStore.isDeleteFailed).toBeTruthy();
      });
    });
  });

  describe('reset', () => {
    it('모든 필드를 리셋시킨다', () => {
      postStore.createStatus = 'successful';
      postStore.reset();

      expect(postStore.createStatus).toBeFalsy();
    });
  });
});
