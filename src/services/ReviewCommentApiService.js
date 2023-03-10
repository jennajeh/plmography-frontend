import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ReviewCommentApiService {
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

  async createComment(userId, postId, reviewCommentBody) {
    const { data } = await this.instance.post('/reviewComments', {
      userId, postId, reviewCommentBody,
    });

    return { data };
  }

  async fetchComments() {
    const { data } = await this.instance.get('/reviewComments');

    const { reviewComments } = data;

    return { reviewComments };
  }

  async deleteComment(id) {
    await this.instance.delete(`/reviewComments/${id}`);
  }
}

export const reviewCommentApiService = new ReviewCommentApiService();
