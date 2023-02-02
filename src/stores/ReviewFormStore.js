import Store from './Store';

export default class ReviewFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      starRate: {
        notSelect: '별점을 선택해 주세요',
      },
      body: {
        empty: '내용을 입력해 주세요',
      },
    };

    this.reset();
  }

  reset() {
    this.body = '';
    this.errors = {};
    this.starRate = 5;

    this.publish();
  }

  changeBody(body) {
    this.body = body;
    this.validateBody();

    this.publish();
  }

  changeStarRate(starRate) {
    this.starRate = starRate;
    this.validateStarRate();

    this.publish();
  }

  validate() {
    this.validateBody();
    this.validateStarRate();

    this.publish();
  }

  validateBody() {
    if (!this.body?.length) {
      this.errors.body = this.errorMessages.body.empty;

      return;
    }

    this.errors.body = '';
  }

  validateStarRate() {
    if (this.starRate < 1) {
      this.errors.starRate = this.errorMessages.starRate.notSelect;

      return;
    }

    this.errors.starRate = '';
  }

  get isRateEmpty() {
    return this.starRate < 1;
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const reviewFormStore = new ReviewFormStore();
