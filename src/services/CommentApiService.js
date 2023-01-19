import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class CommentApiService {
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

  async createComment(userId, postId, commentBody) {
    const { data } = await this.instance.post('/comments', {
      userId, postId, commentBody,
    });

    return { data };
  }

  async fetchComments() {
    const { data } = await this.instance.get('/comments');

    const { comments } = data;

    return { comments };
  }

  async deleteComment(id) {
    await this.instance.delete(`/comments/${id}`);
  }
}

export const commentApiService = new CommentApiService();
