import PostFormStore from './PostFormStore';

const context = describe;

describe('PostCommentFormStore', () => {
  let postFormStore;

  beforeEach(() => {
    postFormStore = new PostFormStore();
  });

  describe('changePostBody', () => {
    context('내용을 올바르게 입력했을 때', () => {
      it('입력된 내용이 저장된다', () => {
        postFormStore.changePostBody('내 인생 작품!');

        expect(postFormStore.postBody).toBe('내 인생 작품!');
      });
    });
  });

  describe('changeTitle', () => {
    context('제목을 입력했을 때', () => {
      it('입력된 제목이 저장된다', () => {
        postFormStore.changeTitle('내 인생 작품!');

        expect(postFormStore.title).toBe('내 인생 작품!');
      });
    });
  });

  describe('validatePostBody', () => {
    context('내용을 올바르게 입력했을 때', () => {
      it('에러 메시지를 반환하지 않는다', () => {
        postFormStore.changePostBody('하핳');

        postFormStore.validatePostBody();

        expect(postFormStore.errors.postBody).toBeFalsy();

        expect(postFormStore.postBody).toBe('하핳');
      });
    });

    context('내용이 비어있을 때', () => {
      it('에러 메시지를 반환한다', () => {
        postFormStore.changePostBody('');

        postFormStore.validatePostBody();

        expect(postFormStore.errors.postBody).toBeTruthy();

        expect(postFormStore.errors.postBody).toBe('내용을 입력해 주세요');
      });
    });
  });

  describe('validateTitle', () => {
    context('내용을 올바르게 입력했을 때', () => {
      it('에러 메시지를 반환하지 않는다', () => {
        postFormStore.changeTitle('점심메뉴 추천해주세요!');

        postFormStore.validateTitle();

        expect(postFormStore.errors.title).toBeFalsy();

        expect(postFormStore.title).toBe('점심메뉴 추천해주세요!');
      });
    });

    context('내용이 비어있을 때', () => {
      it('에러 메시지를 반환한다', () => {
        postFormStore.changeTitle('');

        postFormStore.validateTitle();

        expect(postFormStore.errors.title).toBeTruthy();

        expect(postFormStore.errors.title).toBe('제목을 입력해 주세요');
      });
    });
  });

  describe('reset', () => {
    it('리뷰 내용을 리셋한다', () => {
      postFormStore.changePostBody('인생 작품!');
      postFormStore.reset();

      expect(postFormStore.postBody).toBeFalsy();
    });
  });
});
