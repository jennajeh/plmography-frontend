import PostCommentFormStore from './PostCommentFormStore';

const context = describe;

describe('PostCommentFormStore', () => {
  let postCommentFormStore;

  beforeEach(() => {
    postCommentFormStore = new PostCommentFormStore();
  });

  describe('changeBody', () => {
    context('댓글 내용을 입력했을 때', () => {
      it('입력된 댓글이 저장된다', () => {
        postCommentFormStore.changeBody('내 인생 작품!');

        expect(postCommentFormStore.body).toBe('내 인생 작품!');
      });
    });
  });

  describe('validateBody', () => {
    context('코멘트 내용을 입력했을 때', () => {
      it('에러 메시지를 반환하지 않는다', () => {
        postCommentFormStore.changeBody('하핳');

        postCommentFormStore.validateBody();

        expect(postCommentFormStore.errors.body).toBeFalsy();

        expect(postCommentFormStore.body).toBe('하핳');
      });
    });

    context('코멘트 내용이 비어있을 때', () => {
      it('에러 메시지를 반환한다', () => {
        postCommentFormStore.changeBody('');

        postCommentFormStore.validateBody();

        expect(postCommentFormStore.errors.body).toBeTruthy();

        expect(postCommentFormStore.errors.body).toBe('내용을 입력해 주세요');
      });
    });
  });

  describe('reset', () => {
    it('리뷰 내용을 리셋한다', () => {
      postCommentFormStore.changeBody('인생 작품!');
      postCommentFormStore.reset();

      expect(postCommentFormStore.body).toBeFalsy();
    });
  });
});
