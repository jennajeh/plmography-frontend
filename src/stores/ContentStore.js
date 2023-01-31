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
    const wishContentIds = await contentApiService.toggleWishContent(id);

    this.content = {
      ...this.content,
      wishContentIds,
    };

    this.publish();
  }

  async toggleWatched(id) {
    const watchedContentIds = await contentApiService.toggleWatchedContent(id);

    this.content = {
      ...this.content,
      watchedContentIds,
    };

    this.publish();
  }

  async toggleFavorite(id) {
    const favoriteContentIds = await contentApiService.toggleFavoriteContent(id);

    this.content = {
      ...this.content,
      favoriteContentIds,
    };

    this.publish();
  }
}

export const contentStore = new ContentStore();
