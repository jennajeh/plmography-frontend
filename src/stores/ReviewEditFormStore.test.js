import ReviewEditFormStore from './ReviewEditFormStore';

const context = describe;

describe('ReviewEditFormStore', () => {
  let reviewEditFormStore;

  beforeEach(() => {
    reviewEditFormStore = new ReviewEditFormStore();
  });

  describe('changeBody', () => {
    context('리뷰 내용을 수정했을 때', () => {
      it('수정된 리뷰 내용이 저장된다', () => {
        reviewEditFormStore.body = '별점 1점입니다';

        reviewEditFormStore.changeBody('내 인생 작품!');

        expect(reviewEditFormStore.body).toBe('내 인생 작품!');
      });
    });
  });

  describe('validateBody', () => {
    context('리뷰 내용을 입력했을 때', () => {
      it('에러 메시지를 반환하지 않는다', () => {
        reviewEditFormStore.changeBody('하핳');

        reviewEditFormStore.validateBody();

        expect(reviewEditFormStore.errors.body).toBeFalsy();

        expect(reviewEditFormStore.body).toBe('하핳');
      });
    });

    context('리뷰 내용이 비어있을 때', () => {
      it('에러 메시지를 반환한다', () => {
        reviewEditFormStore.changeBody('');

        reviewEditFormStore.validateBody();

        expect(reviewEditFormStore.errors.body).toBeTruthy();

        expect(reviewEditFormStore.errors.body).toBe('내용을 입력해 주세요');
      });
    });
  });

  describe('fillFields', () => {
    it('리뷰 내용을 입력한다', () => {
      const review = {
        id: 1,
        userId: 2,
        contentId: 1,
        reviewBody: '추천합니다',
        starRate: 5,
        likeUserIds: [],
        createdAt: '2022-12-21T19:05:30.574542',
        updatedAt: '2022-12-21T19:05:30.574542',
      };

      reviewEditFormStore.fillFields(review);

      expect(reviewEditFormStore.body).toBe('추천합니다');
    });
  });

  describe('reset', () => {
    it('리뷰 내용을 리셋한다', () => {
      reviewEditFormStore.changeBody('인생 작품!');
      reviewEditFormStore.reset();

      expect(reviewEditFormStore.body).toBeFalsy();
    });
  });
});
