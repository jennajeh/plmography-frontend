import { contentApiService } from '../services/ContentApiService';
import Store from './Store';

export default class ContentStore extends Store {
  constructor() {
    super();

    this.contents = [];
    this.expiredContents = [];
    this.content = {};

    this.favoriteContents = [];
    this.watchedContents = [];
    this.wishContents = [];

    this.totalPages = 0;
    this.expiredTotalPages = 0;
  }

  async fetchTopRatedContents() {
    const { data } = await contentApiService.fetchTopRatedContents();

    const { contents } = data;

    this.contents = contents;

    this.publish();
  }

  async fetchExpiredNetflix({ month, page, size }) {
    const { data } = await contentApiService.fetchExpiredNetflixContents({ month, page, size });

    const { contents, pages } = data;

    this.expiredContents = contents;
    this.expiredTotalPages = pages.totalPages;

    this.publish();
  }

  async fetchContents({ page, size, filter } = {}) {
    const { contents, pages } = await contentApiService.fetchContents({ page, size, filter });

    this.contents = contents;
    this.totalPages = pages.totalPages;

    this.publish();
  }

  async fetchContent(tmdbId) {
    const content = await contentApiService.fetchContent(tmdbId);

    this.content = content;

    this.publish();
  }

  async fetchThemeContents({
    themeId, page, size, filter,
  } = {}) {
    const { contents, pages } = await contentApiService.fetchThemeContents({
      themeId, page, size, filter,
    });

    this.contents = contents;
    this.totalPages = pages.totalPages;

    this.publish();
  }

  async fetchFavoriteContents({ userId, favoriteContentId }) {
    const {
      userProfileContents,
    } = await contentApiService.fetchFavoriteContents({ userId, favoriteContentId });

    this.favoriteContents = userProfileContents;

    this.publish();
  }

  async fetchWatchedContents({ userId, watchedContentId }) {
    const {
      userProfileContents,
    } = await contentApiService.fetchWatchedContents({ userId, watchedContentId });

    this.watchedContents = userProfileContents;

    this.publish();
  }

  async fetchWishContents({ userId, wishContentId }) {
    const {
      userProfileContents,
    } = await contentApiService.fetchWishContents({ userId, wishContentId });

    this.wishContents = userProfileContents;

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
