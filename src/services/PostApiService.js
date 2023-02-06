/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class PostApiService {
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

  async createPost(title, postBody, image) {
    const { data } = await this.instance.post('/posts', {
      title, postBody, image,
    });

    return { data };
  }

  async fetchPosts({ page, size, filter }) {
    const filterQuery = filter
      ? `?${['keyword']
        .map((key) => (filter[key] ? `${key}=${filter[key]}` : ''))
        .join('&')}`
      : '';

    const pageQuery = page ? `page=${page}` : '';

    const sizeQuery = size ? `size=${size}` : '';

    const query = [filterQuery, pageQuery, sizeQuery]
      .filter((elem) => elem)
      .join('&');

    const { data } = await this.instance.get(`/posts${query}`);

    const { posts, pages } = data;

    return { posts, pages };
  }

  async fetchPost(postId) {
    const { data } = await this.instance.get(`/posts/${postId}`);

    const post = data;

    return post;
  }

  async fetchHitPosts() {
    const { data } = await this.instance.get('/posts/topHit');

    const { posts } = data;

    return { posts };
  }

  async fetchMyPosts() {
    const { data } = await this.instance.get('/posts/me');

    const { myPosts } = data;

    return { myPosts };
  }

  async updateHit(postId) {
    const { data } = await this.instance.patch(`/posts/${postId}/updateHit`);

    return { id: data.id };
  }

  async modifyPost(postId, title, postBody, image) {
    const { data } = await this.instance.patch(`/posts/${postId}/modify`, {
      postId, title, postBody, image,
    });

    return {
      id: data.id,
    };
  }

  async deletePost(postId) {
    await this.instance.delete(`/posts/${postId}`);
  }

  async deletePosts(checkedPosts) {
    const postIds = [...checkedPosts];

    await this.instance.delete('/posts', { data: postIds });
  }

  async upload(formData) {
    const url = `${baseUrl}/posts/upload`;

    const { data } = await axios.post(url, formData);

    return { data };
  }
}

export const postApiService = new PostApiService();
