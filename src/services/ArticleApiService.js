import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ArticleApiService {
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

  async fetchArticles({ page, size }) {
    const { data } = await this.instance.get(`/articles?page=${page}&size=${size}`);

    const { articles, pages } = data;

    return {
      articles, pages,
    };
  }

  async fetchArticle(contentId) {
    const { data } = await this.instance.get(`/articles/${contentId}`);

    return { data };
  }
}

export const articleApiService = new ArticleApiService();
