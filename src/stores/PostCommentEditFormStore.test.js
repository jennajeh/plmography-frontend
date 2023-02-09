import PostCommentEditFormStore from './PostCommentEditFormStore';

const context = describe;

describe('PostCommentEditFormStore', () => {
  let postCommentEditFormStore;

  beforeEach(() => {
    postCommentEditFormStore = new PostCommentEditFormStore();
  });

  describe('changeBody', () => {
    context('댓글 내용을 수정했을 때', () => {
      it('수정된 댓글이 저장된다', () => {
        postCommentEditFormStore.body = '별점 1점입니다';

        postCommentEditFormStore.changeBody('내 인생 작품!');

        expect(postCommentEditFormStore.body).toBe('내 인생 작품!');
      });
    });
  });

  describe('validateBody', () => {
    context('댓글 내용을 입력했을 때', () => {
      it('에러 메시지를 반환하지 않는다', () => {
        postCommentEditFormStore.changeBody('하핳');

        postCommentEditFormStore.validateBody();

        expect(postCommentEditFormStore.errors.body).toBeFalsy();

        expect(postCommentEditFormStore.body).toBe('하핳');
      });
    });

    context('댓글 내용이 비어있을 때', () => {
      it('에러 메시지를 반환한다', () => {
        postCommentEditFormStore.changeBody('');

        postCommentEditFormStore.validateBody();

        expect(postCommentEditFormStore.errors.body).toBeTruthy();

        expect(postCommentEditFormStore.errors.body).toBe('내용을 입력해 주세요');
      });
    });
  });

  describe('fillFields', () => {
    it('댓글 내용을 입력한다', () => {
      const postComment = {
        id: 1,
        writer: {
          id: 1,
          nickname: 'jenna',
          profileImage: 'https://source.boringavatars.com/beam/120/nickname=jenna',
        },
        postId: 1,
        postCommentBody: '잘 보고 오셨네요',
        isDeleted: false,
        createdAt: '2022-01-01T17:57:23.929359',
        updatedAt: '2022-01-01T17:57:23.929359',
      };

      postCommentEditFormStore.fillFields(postComment);

      expect(postCommentEditFormStore.body).toBe('잘 보고 오셨네요');
    });
  });

  describe('reset', () => {
    it('리뷰 내용을 리셋한다', () => {
      postCommentEditFormStore.changeBody('인생 작품!');
      postCommentEditFormStore.reset();

      expect(postCommentEditFormStore.body).toBeFalsy();
    });
  });
});
