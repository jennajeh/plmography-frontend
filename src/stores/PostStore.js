/* eslint-disable class-methods-use-this */
import { postApiService } from '../services/PostApiService';
import Store from './Store';

export default class PostStore extends Store {
  constructor() {
    super();

    this.posts = [];
    this.myPosts = [];
    this.hitPosts = [];
    this.post = {};
    this.image = '';

    this.isPostsLoading = false;
    this.isMyPostsLoading = false;
    this.isPostLoading = false;
    this.isHitPostsLoading = false;

    this.createStatus = '';
    this.modifyStatus = '';
    this.deleteStatus = '';

    this.totalPages = 0;
  }

  reset() {
    this.posts = [];
    this.myPosts = [];
    this.hitPosts = [];
    this.post = {};
    this.image = '';

    this.isPostsLoading = false;
    this.isMyPostsLoading = false;
    this.isPostLoading = false;
    this.isHitPostsLoading = false;

    this.createStatus = '';
    this.modifyStatus = '';
    this.deleteStatus = '';

    this.totalPages = 0;
  }

  async create(title, postBody, image) {
    this.startWrite();

    try {
      if (typeof image !== 'string') {
        const formData = new FormData();

        formData.append('multipartFile', image);

        const img = await postApiService.upload(formData);

        await postApiService.createPost(title, postBody, img);

        this.completeWrite();

        return;
      }

      await postApiService.createPost(title, postBody, image);

      this.completeWrite();

      this.publish();
    } catch (e) {
      this.failWrite();

      this.publish();
    }
  }

  async fetchHitPosts() {
    this.startHitPostsLoad();

    try {
      const { posts } = await postApiService.fetchHitPosts();

      this.completeHitPostsLoad(posts);
    } catch (e) {
      this.failHitPostsLoad();
    }
  }

  async fetchPosts({ page, size, filter } = {}) {
    this.startPostsLoad();

    try {
      const { posts, pages } = await postApiService.fetchPosts({ page, size, filter });

      this.completePostsLoad(posts);
      this.totalPages = pages.totalPages;

      this.publish();
    } catch (e) {
      this.failPostsLoad();
    }
  }

  async fetchPost(postId) {
    this.startPostLoad();

    try {
      const post = await postApiService.fetchPost(postId);

      this.completePostLoad(post);
    } catch (e) {
      this.failPostLoad();
    }
  }

  async fetchMyPosts() {
    this.startMyPostsLoad();

    try {
      const { myPosts } = await postApiService.fetchMyPosts();

      this.completeMyPostsLoad(myPosts);
    } catch (e) {
      this.failMyPostsLoad();
    }
  }

  async modify(postId, title, postBody, image) {
    this.startModify();

    try {
      if (typeof image !== 'string') {
        const formData = new FormData();

        formData.append('multipartFile', image);

        const img = await postApiService.upload(formData);

        await postApiService.modifyPost(postId, title, postBody, img);

        this.completeModify();

        return;
      }

      await postApiService.modifyPost(postId, title, postBody, image);

      this.completeModify();

      this.publish();
    } catch (e) {
      this.failModify();

      this.publish();
    }
  }

  async delete(postId) {
    this.startDelete();

    try {
      await postApiService.deletePost(postId);

      this.completeDelete();

      this.publish();
    } catch (e) {
      this.failDelete();

      this.publish();
    }
  }

  startPostsLoad() {
    this.isPostsLoading = true;
    this.posts = [];

    this.publish();
  }

  completePostsLoad(posts) {
    this.isPostsLoading = false;
    this.posts = posts;
  }

  failPostsLoad() {
    this.isPostsLoading = false;
    this.posts = [];

    this.publish();
  }

  startPostLoad() {
    this.isPostLoading = true;
    this.post = {};

    this.publish();
  }

  completePostLoad(post) {
    this.isPostLoading = false;
    this.post = post;

    this.publish();
  }

  failPostLoad() {
    this.isPostLoading = false;
    this.post = {};

    this.publish();
  }

  startMyPostsLoad() {
    this.isMyPostsLoading = true;
    this.myPosts = [];

    this.publish();
  }

  completeMyPostsLoad(myPosts) {
    this.isMyPostsLoading = false;
    this.myPosts = myPosts;

    this.publish();
  }

  failMyPostsLoad() {
    this.isMyPostsLoading = false;
    this.myPosts = [];

    this.publish();
  }

  startHitPostsLoad() {
    this.isHitPostsLoading = true;
    this.hitPosts = [];

    this.publish();
  }

  completeHitPostsLoad(hitPosts) {
    this.isHitPostsLoading = false;
    this.hitPosts = hitPosts;

    this.publish();
  }

  failHitPostsLoad() {
    this.isHitPostsLoading = false;
    this.hitPosts = [];

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

  isMyPost(userId) {
    return this.post?.writer?.id === userId;
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

export const postStore = new PostStore();
