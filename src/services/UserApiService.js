/* eslint-disable class-methods-use-this */
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
    email, nickname, password, passwordCheck,
  }) {
    const { data } = await this.instance.post('/users', {
      email, nickname, password, passwordCheck,
    });

    return data;
  }

  async fetchMe() {
    const { data } = await this.instance.get('/users/me');

    return { data };
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

    return { data };
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

  async uploadImage(formData) {
    const url = `${baseUrl}/users/upload-image`;

    const { data } = await axios.post(url, formData);

    const image = data;

    return image;
  }
}

export const userApiService = new UserApiService();
