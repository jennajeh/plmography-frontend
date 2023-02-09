/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { postCommentApiService } from '../services/PostCommentApiService';
import Store from './Store';

export default class PostCommentStore extends Store {
  constructor() {
    super();

    this.postComments = [];
    this.myPostComments = [];
    this.postComment = {};

    this.isCommentsLoading = false;
    this.isCommentLoading = false;
    this.isMyCommentsLoading = false;

    this.modifyCommentButtonOpened = false;

    this.createStatus = '';
    this.modifyStatus = '';
    this.deleteStatus = '';

    this.totalPages = 0;
  }

  reset() {
    this.postComments = [];
    this.myPostComments = [];
    this.postComment = {};

    this.isCommentsLoading = false;
    this.isCommentLoading = false;
    this.isMyCommentsLoading = false;

    this.modifyCommentButtonOpened = false;

    this.createStatus = '';
    this.modifyStatus = '';
    this.deleteStatus = '';

    this.totalPages = 0;
  }

  async create(postId, postCommentBody) {
    this.startWrite();

    try {
      await postCommentApiService.createComment(postId, postCommentBody);

      this.completeWrite();

      this.publish();
    } catch (e) {
      this.failWrite();

      this.publish();
    }
  }

  async fetchComments({ page, size, postId }) {
    this.startCommentsLoad();

    try {
      const { postComments, pages } = await postCommentApiService.fetchComments({ page, size, postId });

      this.completeCommentsLoad(postComments);

      this.totalPages = pages.totalPages;
    } catch (e) {
      this.failCommentsLoad();
    }
  }

  async fetchMyComments() {
    this.startMyCommentsLoad();

    try {
      const { myPostComments } = await postCommentApiService.fetchMyComments();

      this.completeMyCommentsLoad(myPostComments);
    } catch (e) {
      this.failMyCommentsLoad();
    }
  }

  async modify(commentId, postCommentBody) {
    this.startModify();

    try {
      await postCommentApiService.modifyComment(commentId, postCommentBody);

      this.completeModify();

      this.publish();
    } catch (e) {
      this.failModify();

      this.publish();
    }
  }

  async delete(commentId) {
    this.startDelete();

    try {
      await postCommentApiService.deleteComment(commentId);

      this.completeDelete();

      this.publish();
    } catch (e) {
      this.failDelete();

      this.publish();
    }
  }

  startCommentsLoad() {
    this.isCommentsLoading = true;
    this.postComments = [];

    this.publish();
  }

  completeCommentsLoad(postComments) {
    this.isCommentsLoading = false;
    this.postComments = postComments;

    this.publish();
  }

  failCommentsLoad() {
    this.isCommentsLoading = false;
    this.postComments = [];

    this.publish();
  }

  startMyCommentsLoad() {
    this.isMyCommentsLoading = true;
    this.myPostComments = [];

    this.publish();
  }

  completeMyCommentsLoad(myPostComments) {
    this.isMyCommentsLoading = false;
    this.myPostComments = myPostComments;

    this.publish();
  }

  failMyCommentsLoad() {
    this.isMyCommentsLoading = false;
    this.myPostComments = [];

    this.publish();
  }

  startCommentLoad() {
    this.isCommentLoading = true;
    this.postComment = {};

    this.publish();
  }

  completeCommentLoad(postComment) {
    this.isCommentLoading = false;
    this.postComment = postComment;

    this.publish();
  }

  failCommentLoad() {
    this.isCommentLoading = false;
    this.postComment = {};

    this.publish();
  }

  changeModifyCommentButtonStatus() {
    this.modifyCommentButtonOpened = !this.modifyCommentButtonOpened;

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

export const postCommentStore = new PostCommentStore();
