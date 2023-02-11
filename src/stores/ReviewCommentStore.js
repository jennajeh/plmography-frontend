import { reviewCommentApiService } from '../services/ReviewCommentApiService';
import Store from './Store';

export default class ReviewCommentStore extends Store {
  constructor() {
    super();

    this.reviewComments = [];
    this.reviewComment = {};
    this.selectedReviewId = 0;

    this.isCommentsLoading = false;
    this.isCommentLoading = false;

    this.createCommentButtonOpened = false;

    this.createStatus = '';
    this.deleteStatus = '';
  }

  reset() {
    this.reviewComments = [];
    this.reviewComment = {};
    this.selectedReviewId = 0;

    this.isCommentsLoading = false;
    this.isCommentLoading = false;

    this.createCommentButtonOpened = false;

    this.createStatus = '';
    this.deleteStatus = '';
  }

  async create(userId, postId, reviewCommentBody) {
    this.startWrite();

    try {
      await reviewCommentApiService.createComment(userId, postId, reviewCommentBody);

      this.completeWrite();

      this.publish();
    } catch (e) {
      this.failWrite();

      this.publish();
    }
  }

  async fetchComments() {
    this.startCommentsLoad();

    try {
      const { reviewComments } = await reviewCommentApiService.fetchComments();

      this.completeCommentsLoad(reviewComments);

      this.publish();
    } catch (e) {
      this.failCommentsLoad();

      this.publish();
    }
  }

  async delete(id) {
    this.startDelete();

    try {
      await reviewCommentApiService.deleteComment(id);

      this.completeDelete();

      this.publish();
    } catch (e) {
      this.failDelete();

      this.publish();
    }
  }

  startCommentsLoad() {
    this.isCommentsLoading = true;
    this.reviewComments = [];

    this.publish();
  }

  completeCommentsLoad(reviewComments) {
    this.isCommentsLoading = false;
    this.reviewComments = reviewComments;

    this.publish();
  }

  failCommentsLoad() {
    this.isCommentsLoading = false;
    this.reviewComments = [];

    this.publish();
  }

  changeCreateCommentButtonStatus(reviewId) {
    this.createCommentButtonOpened = !this.createCommentButtonOpened;

    this.selectedReviewId = reviewId;

    this.publish();
  }

  isDeleted() {
    return this.reviewComments.filter((comment) => !comment.deleted);
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

  get isDeleteSuccessful() {
    return this.deleteStatus === 'successful';
  }

  get isDeleteFailed() {
    return this.deleteStatus === 'failed';
  }
}

export const reviewCommentStore = new ReviewCommentStore();
