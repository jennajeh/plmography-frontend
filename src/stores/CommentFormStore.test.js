import CommentFormStore from './CommentFormStore';

const context = describe;

describe('ReviewEditFormStore', () => {
  let commentFormStore;

  beforeEach(() => {
    commentFormStore = new CommentFormStore();
  });

  describe('changeBody', () => {
    context('리뷰 내용을 입력했을 때', () => {
      it('입력된 리뷰 내용이 저장된다', () => {
        commentFormStore.changeBody('내 인생 작품!');

        expect(commentFormStore.body).toBe('내 인생 작품!');
      });
    });
  });

  describe('validateBody', () => {
    context('코멘트 내용을 입력했을 때', () => {
      it('에러 메시지를 반환하지 않는다', () => {
        commentFormStore.changeBody('하핳');

        commentFormStore.validateBody();

        expect(commentFormStore.errors.body).toBeFalsy();

        expect(commentFormStore.body).toBe('하핳');
      });
    });

    context('코멘트 내용이 비어있을 때', () => {
      it('에러 메시지를 반환한다', () => {
        commentFormStore.changeBody('');

        commentFormStore.validateBody();

        expect(commentFormStore.errors.body).toBeTruthy();

        expect(commentFormStore.errors.body).toBe('내용을 입력해 주세요');
      });
    });
  });

  describe('reset', () => {
    it('리뷰 내용을 리셋한다', () => {
      commentFormStore.changeBody('인생 작품!');
      commentFormStore.reset();

      expect(commentFormStore.body).toBeFalsy();
    });
  });
});
