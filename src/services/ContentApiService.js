/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ContentApiService {
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

  async fetchContents({ page, size, filter }) {
    const filterQuery = filter
      ? `?${['platform', 'type', 'genre', 'date', 'searchTitle', 'sort']
        .map((key) => (filter[key] ? `${key}=${filter[key]}` : ''))
        .filter((query) => query)
        .join('&')}`
      : '';

    const pageQuery = page ? `page=${page}` : '';

    const sizeQuery = size ? `size=${size}` : '';

    const query = [filterQuery, pageQuery, sizeQuery]
      .filter((elem) => elem)
      .join('&');

    const { data } = await this.instance.get(`/contents${query}`);

    const { contents, pages } = data;

    return { contents, pages };
  }

  async fetchContent(tmdbId) {
    const { data } = await this.instance.get(`/contents/${tmdbId}`);

    return data;
  }

  async toggleWishContent(id) {
    const { data } = await this.instance.patch(`/contents/${id}/wishUserIds`);

    return data.wishUserIds;
  }

  async toggleWatchedContent(id) {
    const { data } = await this.instance.patch(`/contents/${id}/watchedUserIds`);

    return data.watchedUserIds;
  }

  async toggleFavoriteContent(id) {
    const { data } = await this.instance.patch(`/contents/${id}/favoriteUserIds`);

    return data.favoriteUserIds;
  }
}

export const contentApiService = new ContentApiService();
