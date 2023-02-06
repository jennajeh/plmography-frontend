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

  async fetchTopRatedContents() {
    const { data } = await this.instance.get('/contents/topRated');

    return { data };
  }

  async fetchContents({ page, size, filter }) {
    const filterQuery = filter
      ? `?${['platform', 'type', 'genre', 'date', 'searchTitle', 'sort']
        .map((key) => (filter[key] ? `${key}=${filter[key]}` : ''))
        .join('&')}`
      : '';

    const pageQuery = page ? `page=${page}` : '';

    const sizeQuery = size ? `size=${size}` : '';

    const query = [filterQuery, pageQuery, sizeQuery]
      .filter((elem) => elem)
      .join('&');

    const { data } = await this.instance.get(`/contents/filter${query}`);

    const { contents, pages } = data;

    return { contents, pages };
  }

  async fetchContent(tmdbId) {
    const { data } = await this.instance.get(`/contents/${tmdbId}`);

    const content = data;

    return content;
  }

  async fetchThemeContents({
    themeId, page, size, filter,
  }) {
    const filterQuery = filter
      ? `?${['platform']
        .map((key) => (filter[key] ? `${key}=${filter[key]}` : ''))
        .join('&')}`
      : '';

    const pageQuery = page ? `page=${page}` : '';

    const sizeQuery = size ? `size=${size}` : '';

    const query = [filterQuery, pageQuery, sizeQuery]
      .filter((elem) => elem)
      .join('&');

    const { data } = await this.instance.get(`/themes/${themeId}/contents${query}`);

    const { contents, pages } = data;

    return { contents, pages };
  }

  async fetchFavoriteContents({ userId, favoriteContentId }) {
    const { data } = await this.instance.get(`/contents/favorite?userId=${userId}&favoriteContentId=${favoriteContentId}`);

    const { userProfileContents } = data;

    return { userProfileContents };
  }

  async fetchWatchedContents({ userId, watchedContentId }) {
    const { data } = await this.instance.get(`/contents/watched?userId=${userId}&watchedContentId=${watchedContentId}`);

    const { userProfileContents } = data;

    return { userProfileContents };
  }

  async fetchWishContents({ userId, wishContentId }) {
    const { data } = await this.instance.get(`/contents/wish?userId=${userId}&wishContentId=${wishContentId}`);

    const { userProfileContents } = data;

    return { userProfileContents };
  }

  async toggleWishContent(tmdbId) {
    const { data } = await this.instance.patch(`/users/wishContent/${tmdbId}`);

    return data.wishContentIds;
  }

  async toggleWatchedContent(tmdbId) {
    const { data } = await this.instance.patch(`/users/watchedContent/${tmdbId}`);

    return data.watchedContentIds;
  }

  async toggleFavoriteContent(tmdbId) {
    const { data } = await this.instance.patch(`/users/favoriteContent/${tmdbId}`);

    return data.favoriteContentIds;
  }
}

export const contentApiService = new ContentApiService();
