import Store from './Store';
import apiConfig from '../../apiConfig';

export default class YoutubeStore extends Store {
  constructor() {
    super();

    this.videoUrl = '';
  }

  async fetchVideo(tmdbId) {
    const apiBaseUrl = apiConfig.tmdbApiUrl;

    const apiKey = apiConfig.key;

    this.videoUrl = await (
      await fetch(`${apiBaseUrl}/movie/${tmdbId}/videos?api_key=${apiKey}&language=ko-KR`)
    ).json();

    this.publish();
  }
}

export const youtubeStore = new YoutubeStore();
