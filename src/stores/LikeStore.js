import { likeApiService } from '../services/LikeApiService';
import Store from './Store';

export default class LikeStore extends Store {
  constructor() {
    super();

    this.likes = [];
    this.likeStatus = '';
    this.cancelLikeStatus = '';
    this.isLikesLoading = false;
  }

  reset() {
    this.likes = [];
    this.likeStatus = '';
    this.cancelLikeStatus = '';
    this.isLikesLoading = false;
  }

  async fetchLikes() {
    this.startLikesLoad();

    try {
      const { likes } = await likeApiService.fetchLikes();

      this.completeLikesLoad(likes);
    } catch (e) {
      this.failLikesLoad();
    }
  }

  async countLike(postId, userId) {
    this.startLike();

    try {
      await likeApiService.like(postId, userId);

      this.fetchLike();

      this.completeLike();

      this.publish();
    } catch (e) {
      this.failLike();

      this.publish();
    }
  }

  async cancelLike(checkedPosts) {
    this.startCancelLike();

    try {
      await likeApiService.cancelLike(checkedPosts);

      this.completeCancelLike();

      this.publish();
    } catch (e) {
      this.failCancelLike();

      this.publish();
    }
  }

  startLike() {
    this.likeStatus = 'processing';
  }

  completeLike() {
    this.likeStatus = 'successful';
  }

  failLike() {
    this.likeStatus = 'failed';
  }

  startCancelLike() {
    this.cancelLikeStatus = 'processing';
  }

  completeCancelLike() {
    this.cancelLikeStatus = 'successful';
  }

  failCancelLike() {
    this.cancelLikeStatus = 'failed';
  }

  startLikesLoad() {
    this.isLikesLoading = true;
    this.likes = [];

    this.publish();
  }

  completeLikesLoad(likes) {
    this.isLikesLoading = false;
    this.likes = likes;

    this.publish();
  }

  failLikesLoad() {
    this.isLikesLoading = false;
    this.likes = [];

    this.publish();
  }

  isSamePostId(postId) {
    return this.likes.filter((like) => like.postId === postId);
  }

  get isLikeStatusSuccessful() {
    return this.likeStatus === 'successful';
  }

  get isLikeStatusFailed() {
    return this.likeStatus === 'failed';
  }

  get isCancelLikeStatusSuccessful() {
    return this.cancelLikeStatus === 'successful';
  }

  get isCancelLikeStatusFailed() {
    return this.cancelLikeStatus === 'failed';
  }
}

export const likeStore = new LikeStore();
