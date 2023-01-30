import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class SubscribeApiService {
  constructor() {
    this.accessToken = '';

    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;

    if (accessToken) {
      this.instance = axios.create({
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });

      return;
    }

    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  async follow(followingId) {
    await this.instance.post(`/subscribe/${followingId}`, followingId);
  }

  async fetchMySubscribeCount() {
    const { data } = await this.instance.get('/subscribe/me');

    return { data };
  }

  async fetchUserSubscribeCount(userId) {
    const { data } = await this.instance.get(`/subscribe/${userId}`);

    return { data };
  }

  async fetchFollowingList({ userId, page = 1, size }) {
    const { data } = await this.instance.get(`/users/following?userId=${userId}&page=${page}&size=${size}`);

    const { userSubscribes, pages } = data;

    return {
      userSubscribes, pages,
    };
  }

  async fetchFollowerList({ userId, page = 1, size }) {
    const { data } = await this.instance.get(`/users/follower?userId=${userId}&page=${page}&size=${size}`);

    const { userSubscribes, pages } = data;

    return {
      userSubscribes, pages,
    };
  }

  async unFollow(followingId) {
    await this.instance.delete(`/subscribe/${followingId}`);
  }
}

export const subscribeApiService = new SubscribeApiService();
