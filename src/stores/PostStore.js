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
    this.hit = 0;

    this.isPostsLoading = false;
    this.isMyPostsLoading = false;
    this.isPostLoading = false;
    this.isHitPostsLoading = false;

    this.createStatus = '';
    this.modifyStatus = '';
    this.deleteStatus = '';
    this.updateHitStatus = '';

    this.totalPages = 0;
  }

  reset() {
    this.posts = [];
    this.myPosts = [];
    this.hitPosts = [];
    this.post = {};

    this.hit = 0;

    this.isPostsLoading = false;
    this.isMyPostsLoading = false;
    this.isPostLoading = false;
    this.isHitPostsLoading = false;

    this.createStatus = '';
    this.modifyStatus = '';
    this.deleteStatus = '';
    this.updateHitStatus = '';

    this.totalPages = 0;
  }

  async create(title, postBody, image) {
    this.startWrite();

    try {
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
      await postApiService.modifyPost(postId, title, postBody, image);

      this.post.title = title;
      this.post.postBody = postBody;
      this.post.image = image;

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

  async deleteCheckedPost(checkedPosts) {
    this.startDelete();

    try {
      await postApiService.deletePosts(checkedPosts);

      this.completeDelete();

      this.publish();
    } catch (e) {
      this.failDelete();

      this.publish();
    }
  }

  async upload(formData) {
    const { data } = await postApiService.upload(formData);

    this.image = data.image;

    this.publish();
  }

  async updateHit(postId) {
    this.startUpdateHit();

    try {
      await postApiService.updateHit(postId);

      this.hit += 1;

      this.completeUpdateHit();

      this.publish();
    } catch (e) {
      this.failUpdateHit();

      this.publish();
    }
  }

  isMyPosts(userId) {
    return this.posts.filter((post) => post.writer.id === userId);
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

  startUpdateHit() {
    this.updateHitStatus = 'processing';
  }

  completeUpdateHit() {
    this.updateHitStatus = 'successful';
  }

  failUpdateHit() {
    this.updateHitStatus = 'failed';
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

  get isUpdateHitSuccessful() {
    return this.updateHitStatus === 'successful';
  }

  get isUpdateHitFailed() {
    return this.updateHitStatus === 'failed';
  }
}

export const postStore = new PostStore();
