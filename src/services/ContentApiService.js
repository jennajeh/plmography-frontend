/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ContentApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchContents({ page, size, filter }) {
    const filterQuery = filter
      ? `?${['platformData', 'type', 'genre', 'date', 'searchTitle']
        .map((key) => (filter[key] ? `${key}=${filter[key]}` : ''))
        .filter((query) => query)
        .join('&')}`
      : '';

    const pageQuery = page ? `page=${page}` : '';

    const sizeQuery = size ? `size=${size}` : '';

    const query = [filterQuery, pageQuery, sizeQuery]
      .filter((elem) => elem)
      .join('&');

    const url = `${baseUrl}/contents${query}`;

    const { data } = await axios.get(url);

    const { contents, pages } = data;

    return { contents, pages };
  }

  async fetchContent(tmdbId) {
    const url = `${baseUrl}/contents/${tmdbId}`;

    const { data } = await axios.get(url);

    return data;
  }
}

export const contentApiService = new ContentApiService();
