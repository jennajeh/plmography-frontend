import Store from './Store';

export default class ReviewFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      body: {
        empty: '내용을 입력해 주세요',
      },
    };

    this.reset();
  }

  reset() {
    this.body = '';
    this.errors = {};

    this.publish();
  }

  fillFields(review) {
    this.body = review.body;

    this.publish();
  }

  setStarRate(rate) {
    switch (rate) {
    case '⭐️⭐️⭐️⭐️⭐️':
      this.starRate = 5;
      break;

    case '⭐️⭐️⭐️⭐️':
      this.starRate = 4;
      break;

    case '⭐️⭐️⭐️':
      this.starRate = 3;
      break;

    case '⭐️⭐️':
      this.starRate = 2;
      break;

    case '⭐️':
      this.starRate = 1;
      break;

    default:
      break;
    }

    this.publish();
  }

  changeBody(body) {
    this.body = body;
    this.validateBody();

    this.publish();
  }

  async validate() {
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

export const reviewFormStore = new ReviewFormStore();
