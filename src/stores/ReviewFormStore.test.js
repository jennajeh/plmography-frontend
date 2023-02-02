import ReviewFormStore from './ReviewFormStore';

const context = describe;

describe('ReviewFormStore', () => {
  let reviewFormStore;

  beforeEach(() => {
    reviewFormStore = new ReviewFormStore();
  });

  describe('changeBody', () => {
    context('리뷰 내용을 입력했을 때', () => {
      it('리뷰 내용이 저장된다', () => {
        reviewFormStore.changeBody('내 인생 작품!');

        expect(reviewFormStore.body).toBe('내 인생 작품!');
      });
    });
  });

  describe('validateBody', () => {
    context('리뷰 내용을 입력했을 때', () => {
      it('에러 메시지를 반환하지 않는다', () => {
        reviewFormStore.changeBody('하핳');

        reviewFormStore.validateBody();

        expect(reviewFormStore.errors.body).toBeFalsy();

        expect(reviewFormStore.body).toBe('하핳');
      });
    });

    context('리뷰 내용이 비어있을 때', () => {
      it('에러 메시지를 반환한다', () => {
        reviewFormStore.changeBody('');

        reviewFormStore.validateBody();

        expect(reviewFormStore.errors.body).toBeTruthy();

        expect(reviewFormStore.errors.body).toBe('내용을 입력해 주세요');
      });
    });
  });

  describe('validateStarRate', () => {
    context('별점을 선택했을 때', () => {
      it('선택한 별점 개수 만큼 숫자가 저장된다', () => {
        reviewFormStore.changeStarRate(5);

        expect(reviewFormStore.errors.starRate).toBeFalsy();

        expect(reviewFormStore.starRate).toBe(5);
      });
    });

    context('별점을 선택하지 않았을 때', () => {
      it('에러 메시지를 반환한다', () => {
        reviewFormStore.changeStarRate('');

        reviewFormStore.validateStarRate();

        expect(reviewFormStore.errors.starRate).toBeTruthy();

        expect(reviewFormStore.errors.starRate).toBe('별점을 선택해 주세요');
      });
    });
  });

  describe('reset', () => {
    it('리뷰 내용을 리셋한다', () => {
      reviewFormStore.changeBody('인생 작품!');
      reviewFormStore.reset();

      expect(reviewFormStore.body).toBeFalsy();
    });
  });
});
