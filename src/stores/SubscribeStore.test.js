import { subscribeApiService } from '../services/SubscribeApiService';
import SubscribeStore from './SubscribeStore';

const context = describe;

describe('ReviewStore', () => {
  let subscribeStore;

  beforeEach(() => {
    subscribeStore = new SubscribeStore();
  });

  describe('follow', () => {
    context('팔로우에 성공한 경우', () => {
      it('followStatus 가 successful 로 바뀐다', async () => {
        subscribeApiService.setAccessToken('ACCESS.TOKEN');

        const followingId = 2;

        await subscribeStore.follow(followingId);

        expect(subscribeStore.isFollowSuccessful).toBeTruthy();
      });
    });

    context('팔로우에 실패한 경우', () => {
      it('followStatus 가 failed 로 바뀐다', async () => {
        const followingId = '';

        await subscribeStore.follow(followingId);

        expect(subscribeStore.isFollowFailed).toBeTruthy();
      });
    });
  });

  describe('unFollow', () => {
    context('언팔로우에 성공한 경우', () => {
      it('unFollowStatus 가 successful 로 바뀐다', async () => {
        subscribeApiService.setAccessToken('ACCESS.TOKEN');

        const followingId = 2;

        await subscribeStore.unFollow(followingId);

        expect(subscribeStore.isUnFollowSuccessful).toBeTruthy();
      });
    });

    context('언팔로우에 실패한 경우', () => {
      it('unFollowStatus 가 failed 로 바뀐다', async () => {
        subscribeApiService.setAccessToken('');

        const followingId = 2;

        await subscribeStore.unFollow(followingId);

        expect(subscribeStore.isUnFollowFailed).toBeTruthy();
      });
    });
  });

  describe('reset', () => {
    it('모든 필드를 리셋시킨다', () => {
      subscribeStore.followStatus = 'successful';
      subscribeStore.reset();

      expect(subscribeStore.followStatus).toBeFalsy();
    });
  });

  describe('fetchMySubscribeCount', () => {
    it('내 팔로우 정보를 출력한다', async () => {
      await subscribeStore.fetchMySubscribeCount();

      expect(subscribeStore.mySubscribe).toBeTruthy();
      expect(subscribeStore.mySubscribe.followingCount).toBe(1);
    });
  });

  describe('fetchUserSubscribeCount', () => {
    it('다른 유저의 팔로우 정보를 출력한다', async () => {
      const userId = 3;

      await subscribeStore.fetchUserSubscribeCount(userId);

      expect(subscribeStore.subscribe).toBeTruthy();
      expect(subscribeStore.subscribe.subscribeStatus).toBe(true);
    });
  });

  describe('fetchFollowingList', () => {
    it('팔로잉 목록을 출력한다', async () => {
      await subscribeStore.fetchFollowingList({ userId: 1, page: 1, size: 10 });

      expect(subscribeStore.subscribes).toBeTruthy();
      expect(subscribeStore.subscribes[0].nickname).toBe('zzezze');
      expect(subscribeStore.totalPages).toBe(1);
    });
  });

  describe('fetchFollowerList', () => {
    it('팔로워 목록을 출력한다', async () => {
      await subscribeStore.fetchFollowerList({ userId: 1, page: 1, size: 10 });

      expect(subscribeStore.subscribes).toBeTruthy();
      expect(subscribeStore.subscribes[1].nickname).toBe('boni');
      expect(subscribeStore.totalPages).toBe(1);
    });
  });
});
