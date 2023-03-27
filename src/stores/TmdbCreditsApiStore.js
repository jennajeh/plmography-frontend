import Store from './Store';
import apiConfig from '../../apiConfig';

export default class TmdbCreditsApiStore extends Store {
  constructor() {
    super();

    this.credits = '';

    this.actors = [];
  }

  async fetchCredits(tmdbId, type) {
    const apiBaseUrl = apiConfig.tmdbApiUrl;
    const apiKey = apiConfig.key;

    if (type === 'movie') {
      this.credits = await (
        await fetch(`${apiBaseUrl}movie/${tmdbId}/credits?api_key=${apiKey}&language=ko-KR`)
      ).json();
    }

    if (type === 'tv') {
      this.credits = await (
        await fetch(`${apiBaseUrl}tv/${tmdbId}/credits?api_key=${apiKey}&language=ko-KR`)
      ).json();
    }

    this.publish();
  }

  fetchActors() {
    if (this.credits) {
      this.actors = this.credits?.cast?.filter((element, index) => (
        element.known_for_department === 'Acting' && index < 10
      ));
    }

    this.publish();
  }
}

export const tmdbCreditsApiStore = new TmdbCreditsApiStore();
