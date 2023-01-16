import { reviewApiService } from '../services/ReviewApiService';
import Store from './Store';

export default class ReviewStore extends Store {
  constructor() {
    super();

    this.reviews = [];
    this.myReviews = [];
    this.review = {};

    this.isReviewsLoading = false;
    this.isReviewLoading = false;

    this.createStatus = '';
    this.modifyStatus = '';
    this.deleteStatus = '';

    this.totalPages = 0;
  }

  async create(contentId, starRate, reviewBody) {
    this.startWrite();

    try {
      await reviewApiService.createReview(contentId, starRate, reviewBody);

      this.completeWrite();

      this.publish();
    } catch (e) {
      this.failWrite();

      this.publish();
    }
  }

  async fetchReviews({ page, size }) {
    this.startReviewsLoad();

    try {
      const { reviews, pages } = await reviewApiService.fetchReviews({ page, size });

      this.totalPages = pages.totalPages;

      this.completeReviewsLoad(reviews);
    } catch (e) {
      this.failReviewsLoad();
    }
  }

  async fetchMyReviews() {
    this.startMyReviewsLoad();

    try {
      const data = await reviewApiService.fetchMyReviews();

      this.isReviewLoading = false;

      this.myReviews = data;

      this.publish();
    } catch (e) {
      this.failMyReviewsLoad();
    }
  }

  async modify(body, id) {
    this.startModify();

    try {
      await reviewApiService.modifyReview(body, id);

      this.review.reviewBody = body;

      this.completeModify();

      this.publish();
    } catch (e) {
      this.failModify();

      this.publish();
    }
  }

  async delete(id) {
    this.startDelete();

    try {
      await reviewApiService.deleteReview(id);

      this.completeDelete();

      this.publish();
    } catch (e) {
      this.failDelete();

      this.publish();
    }
  }

  async toggleLike(id) {
    const likeUserIds = await reviewApiService.toggleLikeReview(id);

    this.review.likeUserIds = likeUserIds;

    this.publish();
  }

  isOtherReview(userId) {
    return this.reviews.filter((review) => review.writer.id !== userId);
  }

  isMySameContentReview(tmdbId) {
    return this.myReviews.filter((review) => review.contentId === tmdbId);
  }

  isOtherSameContentReview(tmdbId) {
    return this.reviews.filter((review) => review.contentId === tmdbId);
  }

  reset() {
    this.reviews = [];
    this.myReviews = [];
    this.review = {};

    this.isReviewsLoading = false;
    this.isReviewLoading = false;

    this.createStatus = '';
    this.modifyStatus = '';
    this.deleteStatus = '';

    this.totalPages = 0;
  }

  startReviewsLoad() {
    this.isReviewsLoading = true;
    this.reviews = [];

    this.publish();
  }

  completeReviewsLoad(reviews) {
    this.isReviewsLoading = false;
    this.reviews = reviews;

    this.publish();
  }

  startMyReviewsLoad() {
    this.isReviewLoading = true;
    this.myReviews = [];

    this.publish();
  }

  completeMyReviewsLoad(myReviews) {
    this.isReviewLoading = false;
    this.myReviews = myReviews;

    this.publish();
  }

  failReviewsLoad() {
    this.isReviewsLoading = false;
    this.reviews = [];

    this.publish();
  }

  failMyReviewsLoad() {
    this.isReviewLoading = false;
    this.myReviews = [];

    this.publish();
  }

  startWrite() {
    this.createStatus = 'processing';
  }

  completeWrite() {
    this.createStatus = 'successful';
  }

  failWrite() {
    this.createStatus = 'failed';
  }

  startModify() {
    this.modifyStatus = 'processing';
  }

  completeModify() {
    this.modifyStatus = 'successful';
  }

  failModify() {
    this.modifyStatus = 'failed';
  }

  startDelete() {
    this.deleteStatus = 'processing';
  }

  completeDelete() {
    this.deleteStatus = 'successful';
  }

  failDelete() {
    this.deleteStatus = 'failed';
  }

  get isCreateSuccessful() {
    return this.createStatus === 'successful';
  }

  get isCreateFailed() {
    return this.createStatus === 'failed';
  }

  get isModifySuccessful() {
    return this.modifyStatus === 'successful';
  }

  get isModifyFailed() {
    return this.modifyStatus === 'failed';
  }

  get isDeleteSuccessful() {
    return this.deleteStatus === 'successful';
  }

  get isDeleteFailed() {
    return this.deleteStatus === 'failed';
  }
}

export const reviewStore = new ReviewStore();
