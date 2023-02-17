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
    }
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
        .filter((query) => query)
        .join('&')}`
      : '';

    const pageQuery = page ? `page=${page}` : '';

    const sizeQuery = size ? `size=${size}` : '';

    const query = [filterQuery, pageQuery, sizeQuery]
      .filter((elem) => elem)
      .join('&');

    const { data } = await this.instance.get(`/posts/filter${query}`);

    const { posts, pages } = data;

    return { posts, pages };
  }

  async fetchPost(postId) {
    const { data } = await this.instance.get(`/posts/${postId}`);

    const post = data;

    return post;
  }

  async fetchHitPosts() {
    const { data } = await this.instance.get('/posts/top-rank');

    const { posts } = data;

    return { posts };
  }

  async fetchMyPosts() {
    const { data } = await this.instance.get('/posts/me');

    const { myPosts } = data;

    return { myPosts };
  }

  async modifyPost(postId, title, postBody, image) {
    const { data } = await this.instance.patch(`/posts/${postId}`, {
      postId, title, postBody, image,
    });

    return {
      id: data.id,
    };
  }

  async deletePost(postId) {
    await this.instance.delete(`/posts/${postId}`);
  }

  async upload(formData) {
    const url = `${baseUrl}/posts/upload`;

    const { data } = await axios.post(url, formData);

    const image = data;

    return image;
  }
}

export const postApiService = new PostApiService();
