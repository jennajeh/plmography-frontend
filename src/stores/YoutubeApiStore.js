import Store from './Store';
import apiConfig from '../../apiConfig';

export default class YoutubeApiStore extends Store {
  constructor() {
    super();

    this.videoUrl = '';
  }

  async fetchVideo(tmdbId, type) {
    const apiBaseUrl = apiConfig.tmdbApiUrl;

    const apiKey = apiConfig.key;

    if (type === 'movie') {
      this.videoUrl = await (
        await fetch(`${apiBaseUrl}/movie/${tmdbId}/videos?api_key=${apiKey}&language=ko-KR`)
      ).json();
    }

    if (type === 'drama') {
      this.videoUrl = await (
        await fetch(`${apiBaseUrl}/tv/${tmdbId}/videos?api_key=${apiKey}&language=ko-KR`)
      ).json();
    }

    this.publish();
  }
}

export const youtubeApiStore = new YoutubeApiStore();
