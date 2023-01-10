import { reviewApiService } from '../services/ReviewApiService';
import Store from './Store';

export default class ReviewStore extends Store {
  constructor() {
    super();

    this.reviews = [];
    this.review = {};

    this.isReviewsLoading = false;
    this.isReviewLoading = false;

    this.createStatus = '';
    this.modifyStatus = '';
    this.deleteStatus = '';

    this.totalPages = 0;
  }

  async create({
    contentId, starRate, reviewBody,
  }) {
    this.startWrite();

    try {
      await reviewApiService.createReview({
        contentId, starRate, reviewBody,
      });

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

  async fetchReview(id) {
    this.startReviewLoad();

    try {
      const review = await reviewApiService.fetchReview(id);

      this.completeReviewLoad(review);
    } catch (e) {
      this.failReviewLoad();
    }
  }

  async modify({ reviewBody }) {
    this.startModify();

    try {
      await reviewApiService.modifyReview({
        ...this.review,
        reviewBody,
      });

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

      this.reviews = this.reviews.filter((review) => review.id !== id);

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

  isMyReview(userId) {
    return this.review?.writer.id === userId;
  }

  reset() {
    this.reviews = [];
    this.review = {};

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

  startReviewLoad() {
    this.isReviewLoading = true;
    this.review = {};

    this.publish();
  }

  completeReviewLoad(review) {
    this.isReviewLoading = false;
    this.review = review;

    this.publish();
  }

  failReviewsLoad() {
    this.isReviewsLoading = false;
    this.reviews = [];

    this.publish();
  }

  failReviewLoad() {
    this.isReviewLoading = false;
    this.review = {};

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
