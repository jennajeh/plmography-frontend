import { subscribeApiService } from '../services/SubscribeApiService';
import Store from './Store';

export default class SubscribeStore extends Store {
  constructor() {
    super();

    this.subscribes = [];
    this.mySubscribe = {};
    this.subscribe = {};

    this.followStatus = '';
    this.unFollowStatus = '';

    this.totalPages = 0;
  }

  reset() {
    this.subscribes = [];
    this.mySubscribe = [];
    this.subscribe = {};

    this.followStatus = '';
    this.unFollowStatus = '';

    this.totalPages = 0;
  }

  async follow(followingId) {
    this.startFollow();

    try {
      await subscribeApiService.follow(followingId);

      this.completeFollow();

      this.publish();
    } catch (e) {
      this.failFollow();

      this.publish();
    }
  }

  async fetchMySubscribeCount() {
    const { data } = await subscribeApiService.fetchMySubscribeCount();

    this.mySubscribe = data;

    this.publish();
  }

  async fetchUserSubscribeCount(userId) {
    const { data } = await subscribeApiService.fetchUserSubscribeCount(userId);

    this.subscribe = data;

    this.publish();
  }

  async fetchFollowingList({ userId, page, size }) {
    const {
      subscribes, pages,
    } = await subscribeApiService.fetchFollowingList({ userId, page, size });

    this.subscribes = subscribes;
    this.totalPages = pages.totalPages;

    this.publish();
  }

  async fetchFollowerList({ userId, page, size }) {
    const {
      subscribes, pages,
    } = await subscribeApiService.fetchFollowerList({ userId, page, size });

    this.subscribes = subscribes;
    this.totalPages = pages.totalPages;

    this.publish();
  }

  async unFollow(followingId) {
    this.startUnFollow();

    try {
      await subscribeApiService.unFollow(followingId);

      this.completeUnFollow();

      this.publish();
    } catch (e) {
      this.failUnFollow();

      this.publish();
    }
  }

  startFollow() {
    this.followStatus = 'processing';
  }

  completeFollow() {
    this.followStatus = 'successful';
  }

  failFollow() {
    this.followStatus = 'failed';
  }

  startUnFollow() {
    this.unFollowStatus = 'processing';
  }

  completeUnFollow() {
    this.unFollowStatus = 'successful';
  }

  failUnFollow() {
    this.unFollowStatus = 'failed';
  }

  get isFollowSuccessful() {
    return this.followStatus === 'successful';
  }

  get isFollowFailed() {
    return this.followStatus === 'failed';
  }

  get isUnFollowSuccessful() {
    return this.unFollowStatus === 'successful';
  }

  get isUnFollowFailed() {
    return this.unFollowStatus === 'failed';
  }
}

export const subscribeStore = new SubscribeStore();