import Store from './Store';

export default class PostEditFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      title: {
        empty: '제목을 입력해 주세요',
      },
      postBody: {
        empty: '내용을 입력해 주세요',
      },
    };

    this.reset();
  }

  fillFields(post) {
    this.title = post.title;
    this.postBody = post.postBody;
    this.image = post.image;

    this.publish();
  }

  changeTitle(title) {
    this.title = title;
    this.validateTitle();

    this.publish();
  }

  changePostBody(postBody) {
    this.postBody = postBody;
    this.validatePostBody();

    this.publish();
  }

  changeImage(image) {
    this.image = image;

    this.publish();
  }

  reset() {
    this.title = '';
    this.postBody = '';
    this.errors = {};

    this.publish();
  }

  validate() {
    this.validateTitle();
    this.validatePostBody();

    this.publish();
  }

  validateTitle() {
    if (!this.title?.length) {
      this.errors.title = this.errorMessages.title.empty;

      return;
    }

    this.errors.title = '';
  }

  validatePostBody() {
    if (!this.postBody?.length) {
      this.errors.postBody = this.errorMessages.postBody.empty;

      return;
    }

    this.errors.postBody = '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const postEditFormStore = new PostEditFormStore();
