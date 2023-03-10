/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ThemeApiService {
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

  async fetchThemes({ page = 1, size }) {
    const { data } = await this.instance.get(`/themes?page=${page}&size=${size}`);

    const { themes, pages } = data;

    return { themes, pages };
  }

  async fetchHitThemes() {
    const { data } = await this.instance.get('/themes/top-rank');

    const { themes } = data;

    return { themes };
  }
}

export const themeApiService = new ThemeApiService();
