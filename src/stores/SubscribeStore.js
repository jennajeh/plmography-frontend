import { subscribeApiService } from '../services/SubscribeApiService';
import Store from './Store';

export default class SubscribeStore extends Store {
  constructor() {
    super();

    this.subscribes = [];
    this.mySubscribes = {};
    this.subscribe = {};

    this.totalPages = 0;
  }

  reset() {
    this.subscribes = [];
    this.mySubscribes = [];
    this.subscribe = {};

    this.totalPages = 0;
  }

  async follow(followingId) {
    await subscribeApiService.follow(followingId);

    this.publish();
  }

  async fetchMySubscribeCount() {
    const { data } = await subscribeApiService.fetchMySubscribeCount();

    this.mySubscribes = data;

    this.publish();
  }

  async fetchUserSubscribeCount() {
    const { data } = await subscribeApiService.fetchUserSubscribeCount();

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
    await subscribeApiService.unFollow(followingId);

    this.publish();
  }
}

export const subscribeStore = new SubscribeStore();
