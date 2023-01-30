import { contentApiService } from '../services/ContentApiService';
import Store from './Store';

export default class ContentStore extends Store {
  constructor() {
    super();

    this.contents = [];

    this.content = {};

    this.totalPages = 0;
  }

  async fetchContents({ page, size, filter } = {}) {
    const { contents, pages } = await contentApiService.fetchContents({ page, size, filter });

    this.contents = contents;
    this.totalPages = pages.totalPages;

    this.publish();
  }

  async fetchContent(tmdbId) {
    this.content = await contentApiService.fetchContent(tmdbId);

    this.publish();
  }

  async toggleWish(id) {
    const wishUserIds = await contentApiService.toggleWishContent(id);

    this.content = {
      ...this.content,
      wishUserIds,
    };

    this.publish();
  }

  async toggleWatched(id) {
    const watchedUserIds = await contentApiService.toggleWatchedContent(id);

    this.content = {
      ...this.content,
      watchedUserIds,
    };

    this.publish();
  }

  async toggleFavorite(id) {
    const favoriteUserIds = await contentApiService.toggleFavoriteContent(id);

    this.content = {
      ...this.content,
      favoriteUserIds,
    };

    this.publish();
  }
}

export const contentStore = new ContentStore();
