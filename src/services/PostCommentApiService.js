/* eslint-disable max-len */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class PostCommentApiService {
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

  async createComment(postId, postCommentBody) {
    const { data } = await this.instance.post('/postComments', {
      postId, postCommentBody,
    });

    return { id: data.id };
  }

  async fetchComments({ page = 1, size, postId }) {
    const { data } = await this.instance.get(`/posts/${postId}/postComments?page=${page}&size=${size}`);

    const { postComments, pages } = data;

    return { postComments, pages };
  }

  async fetchMyComments() {
    const { data } = await this.instance.get('/postComments/me');

    const { myPostComments } = data;

    return { myPostComments };
  }

  async modifyComment(commentId, postCommentBody) {
    const { data } = await this.instance.patch(`/postComments?commentId=${commentId}&postCommentBody=${postCommentBody}`);

    return {
      id: data.id,
    };
  }

  async deleteComment(commentId) {
    await this.instance.delete(`/postComments/${commentId}`);
  }
}

export const postCommentApiService = new PostCommentApiService();
