/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseUrl = config.apiBaseUrl;

export default class ContentApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchContents({ page, size }) {
    const url = `${baseUrl}/contents?page=${page}&size=${size}`;

    const { data } = await axios.get(url);

    const { contents, pages } = data;

    return {
      contents,
      pages,
    };
  }

  async fetchContent(id) {
    const url = `${baseUrl}/contents/${id}`;

    const { data } = await axios.get(url);

    return data;
  }
}

export const contentApiService = new ContentApiService();
