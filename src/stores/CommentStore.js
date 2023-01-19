import { commentApiService } from '../services/CommentApiService';
import Store from './Store';

export default class CommentStore extends Store {
  constructor() {
    super();

    this.comments = [];
    this.comment = {};

    this.isCommentsLoading = false;
    this.isCommentLoading = false;

    this.createCommentButtonOpened = false;

    this.createStatus = '';
    this.deleteStatus = '';
  }

  reset() {
    this.comments = [];
    this.comment = {};

    this.isCommentsLoading = false;
    this.isCommentLoading = false;

    this.createCommentButtonOpened = false;

    this.createStatus = '';
    this.deleteStatus = '';
  }

  async create(userId, postId, commentBody) {
    this.startWrite();

    try {
      await commentApiService.createComment(userId, postId, commentBody);

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
      const { comments } = await commentApiService.fetchComments();

      this.completeCommentsLoad(comments);

      this.publish();
    } catch (e) {
      this.failCommentsLoad();

      this.publish();
    }
  }

  async delete(id) {
    this.startDelete();

    try {
      await commentApiService.deleteComment(id);

      this.completeDelete();

      this.publish();
    } catch (e) {
      this.failDelete();

      this.publish();
    }
  }

  startCommentsLoad() {
    this.isCommentsLoading = true;
    this.comments = [];

    this.publish();
  }

  completeCommentsLoad(comments) {
    this.isCommentsLoading = false;
    this.comments = comments;

    this.publish();
  }

  failCommentsLoad() {
    this.isCommentsLoading = false;
    this.comments = [];

    this.publish();
  }

  changeCreateCommentButtonStatus() {
    this.createCommentButtonOpened = !this.createCommentButtonOpened;

    this.publish();
  }

  isDeleted() {
    return this.comments.filter((comment) => !comment.deleted);
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

export const commentStore = new CommentStore();
