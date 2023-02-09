/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class LikeApiService {
  async fetchLikes() {
    const { data } = await axios.get(`${baseUrl}/likes`);

    const { likes } = data;

    return { likes };
  }

  async like(postId, userId) {
    const { data } = await axios.post(`${baseUrl}/likes`, {
      postId, userId,
    });

    return { data };
  }

  async cancelLike(checkedPosts) {
    await axios.delete(`${baseUrl}/likes`, {
      data: {
        likeId: checkedPosts,
      },
    });
  }
}

export const likeApiService = new LikeApiService();
