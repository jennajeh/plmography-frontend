import axios from 'axios';
import config from '../../config';

const baseUrl = config.apiBaseUrl;

export default class UserApiService {
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
    }
  }

  async createUser({
    email, nickname, password,
  }) {
    const { data } = await this.instance.post('/users', {
      email, nickname, password,
    });

    return {
      userId: data.userId,
    };
  }

  async fetchUser(userId) {
    const { data } = await this.instance.get(`/users/${userId}`);

    return {
      userId: data.userId,
      email: data.email,
      nickname: data.nickname,
      gender: data.gender,
      birthYear: data.birthYear,
      profileImage: data.profileImage,
    };
  }

  async updateUser({ userId, nickname, profileImage }) {
    const { data } = await this.instance.patch(`/users/${userId}`, { nickname, profileImage });

    return {
      nickname: data.nickname,
      profileImage: data.profileImage,
    };
  }

  async postSession({ email, password }) {
    const { data } = await this.instance.post('/session', { email, password });

    return {
      accessToken: data.accessToken,
    };
  }
}

export const userApiService = new UserApiService();
