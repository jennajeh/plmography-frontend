import Store from './Store';

export default class CommentFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      body: {
        empty: '내용을 입력해 주세요',
      },
    };

    this.reset();
  }

  changeBody(body) {
    this.body = body;
    this.validateBody();

    this.publish();
  }

  reset() {
    this.body = '';
    this.errors = {};

    this.publish();
  }

  validate() {
    this.validateBody();

    this.publish();
  }

  validateBody() {
    if (!this.body?.length) {
      this.errors.body = this.errorMessages.body.empty;

      return;
    }

    this.errors.body = '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const commentFormStore = new CommentFormStore();
