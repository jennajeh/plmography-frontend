import { subscribeApiService } from '../services/SubscribeApiService';
import Store from './Store';

export default class SubscribeStore extends Store {
  constructor() {
    super();

    this.followings = [];
    this.following = {};
    this.followers = [];
    this.follower = {};
    this.mySubscribe = {};

    this.followStatus = '';
    this.unFollowStatus = '';

    this.totalPages = 0;
  }

  reset() {
    this.followings = [];
    this.following = {};
    this.followers = [];
    this.follower = {};
    this.mySubscribe = {};

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

  async fetchSubscribeCount(userId) {
    const { data } = await subscribeApiService.fetchSubscribeCount(userId);

    this.following = data;

    this.publish();
  }

  async fetchFollowingList({ userId, page, size }) {
    const {
      followings, pages,
    } = await subscribeApiService.fetchFollowingList({ userId, page, size });

    this.followings = followings;
    this.totalPages = pages.totalPages;

    this.publish();
  }

  async fetchFollowerList({ userId, page, size }) {
    const {
      followers, pages,
    } = await subscribeApiService.fetchFollowerList({ userId, page, size });

    this.followers = followers;
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
