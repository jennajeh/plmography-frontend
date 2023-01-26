import { contentApiService } from '../services/ContentApiService';
import Store from './Store';

export default class ContentStore extends Store {
  constructor() {
    super();

    this.contents = [];

    this.content = '';

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
}

export const contentStore = new ContentStore();
