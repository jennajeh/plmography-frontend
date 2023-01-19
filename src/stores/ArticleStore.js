import { articleApiService } from '../services/ArticleApiService';
import Store from './Store';

export default class ArticleStore extends Store {
  constructor() {
    super();

    this.articles = [];
    this.article = {};

    this.totalPages = 0;
  }

  async fetchArticles({ page, size }) {
    const { articles, pages } = await articleApiService.fetchArticles({ page, size });

    this.articles = articles;
    this.totalPages = pages.totalPages;

    this.publish();
  }

  async fetchArticle(contentId) {
    const { data } = await articleApiService.fetchArticle(contentId);

    this.article = data;

    this.publish();
  }

  isSameContentId(tmdbId) {
    return this.articles.filter((article) => article.contentId === tmdbId);
  }

  isMySameContentReview(tmdbId) {
    return this.myReviews.filter((review) => review.contentId === tmdbId);
  }
}

export const articleStore = new ArticleStore();
