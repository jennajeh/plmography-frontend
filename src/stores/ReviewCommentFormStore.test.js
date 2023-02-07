import ReviewCommentFormStore from './ReviewCommentFormStore';

const context = describe;

describe('ReviewCommentFormStore', () => {
  let reviewCommentFormStore;

  beforeEach(() => {
    reviewCommentFormStore = new ReviewCommentFormStore();
  });

  describe('changeBody', () => {
    context('리뷰 내용을 입력했을 때', () => {
      it('입력된 리뷰 내용이 저장된다', () => {
        reviewCommentFormStore.changeBody('내 인생 작품!');

        expect(reviewCommentFormStore.body).toBe('내 인생 작품!');
      });
    });
  });

  describe('validateBody', () => {
    context('코멘트 내용을 입력했을 때', () => {
      it('에러 메시지를 반환하지 않는다', () => {
        reviewCommentFormStore.changeBody('하핳');

        reviewCommentFormStore.validateBody();

        expect(reviewCommentFormStore.errors.body).toBeFalsy();

        expect(reviewCommentFormStore.body).toBe('하핳');
      });
    });

    context('코멘트 내용이 비어있을 때', () => {
      it('에러 메시지를 반환한다', () => {
        reviewCommentFormStore.changeBody('');

        reviewCommentFormStore.validateBody();

        expect(reviewCommentFormStore.errors.body).toBeTruthy();

        expect(reviewCommentFormStore.errors.body).toBe('내용을 입력해 주세요');
      });
    });
  });

  describe('reset', () => {
    it('리뷰 내용을 리셋한다', () => {
      reviewCommentFormStore.changeBody('인생 작품!');
      reviewCommentFormStore.reset();

      expect(reviewCommentFormStore.body).toBeFalsy();
    });
  });
});
