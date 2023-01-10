import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ReviewApiService {
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

  async createReview({
    contentId, starRate, reviewBody,
  }) {
    const { data } = await this.instance.post('/reviews', {
      contentId, starRate, reviewBody,
    });

    return {
      id: data.id,
    };
  }

  async fetchReviews({ page = 1, size }) {
    const { data } = await this.instance.get(`/reviews?page=${page}&size=${size}`);

    const { reviews, pages } = data;

    return {
      reviews, pages,
    };
  }

  async fetchReview(id) {
    const { data } = await this.instance.get(`/reviews/${id}`);

    return data;
  }

  async modifyReview(review) {
    const { data } = await this.instance.patch(`/reviews/${review.id}`, {
      ...review,
    });

    return {
      id: data.id,
    };
  }

  async deleteReview(id) {
    await this.instance.delete(`/reviews/${id}`);
  }

  async toggleLikeReview(id) {
    const { data } = await this.instance.patch(`/reviews/${id}/likeUserIds`);

    return data.likeUserIds;
  }
}

export const reviewApiService = new ReviewApiService();
