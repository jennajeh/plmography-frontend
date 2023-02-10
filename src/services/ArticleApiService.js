/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ArticleApiService {
  async fetchArticles({ page, size }) {
    const { data } = await axios.get(`${baseUrl}/articles?page=${page}&size=${size}`);

    const { articles, pages } = data;

    return {
      articles, pages,
    };
  }

  async fetchArticle(contentId) {
    const { data } = await axios.get(`${baseUrl}/articles/${contentId}`);

    return { data };
  }

  async fetchRecentlyCreatedArticles() {
    const { data } = await axios.get(`${baseUrl}/articles/sortByCreatedAt`);

    const { articles } = data;

    return { articles };
  }
}

export const articleApiService = new ArticleApiService();
