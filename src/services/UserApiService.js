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

  async fetchMe() {
    const { data } = await this.instance.get('/users/me');

    return {
      accessToken: data.accessToken,
      email: data.email,
      nickname: data.nickname,
      gender: data.gender,
      birthYear: data.birthYear,
      profileImage: data.profileImage,
    };
  }

  async fetchUser(nickname) {
    const { data } = await this.instance.get('/users/profile', {
      params: {
        nickname,
      },
    });

    return { data };
  }

  async fetchUsers() {
    const { data } = await this.instance.get('/users');

    const { users } = data;

    return users;
  }

  async changeProfile({ nickname, profileImage }) {
    const { data } = await this.instance.patch('/users', { nickname, profileImage });

    return data;
  }

  async countEmailAndNickname({ email, nickname }) {
    const { data } = await this.instance.get(`/users/checkDuplicate?countOnly=true&email=${email}&nickname=${nickname}`);

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
