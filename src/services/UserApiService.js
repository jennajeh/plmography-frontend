import axios from 'axios';
import config from '../config';

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
    email, nickname, password, gender, birthYear,
  }) {
    const { data } = await this.instance.post('/users', {
      email, nickname, password, gender, birthYear,
    });

    return data;
  }

  async fetchUser(userId) {
    const { data } = await this.instance.get(`/users/${userId}`);

    return data;
  }

  async updateUser({
    userId, password, nickname, profileImage,
  }) {
    const { data } = await this.instance.patch(`/users/${userId}`, { password, nickname, profileImage });

    return data;
  }

  async countEmailAndNickname({ email, nickname }) {
    const { data } = await this.instance.get(`/users?countOnly=true&email=${email}&nickname=${nickname}`);

    console.log('INNnnnnnn', data);

    return {
      countEmail: data.countEmail,
      countNickname: data.countNickname,
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
