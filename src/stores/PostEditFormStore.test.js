import PostEditFormStore from './PostEditFormStore';

const context = describe;

describe('PostEditFormStore', () => {
  let postEditFormStore;

  beforeEach(() => {
    postEditFormStore = new PostEditFormStore();
  });

  describe('changePostBody', () => {
    context('내용을 입력했을 때', () => {
      it('입력된 내용이 저장된다', () => {
        postEditFormStore.changePostBody('내 인생 작품!');

        expect(postEditFormStore.postBody).toBe('내 인생 작품!');
      });
    });
  });

  describe('changeTitle', () => {
    context('제목을 입력했을 때', () => {
      it('입력된 제목이 저장된다', () => {
        postEditFormStore.changeTitle('내 인생 작품!');

        expect(postEditFormStore.title).toBe('내 인생 작품!');
      });
    });
  });

  describe('validatePostBody', () => {
    context('내용을 올바르게 입력했을 때', () => {
      it('에러 메시지를 반환하지 않는다', () => {
        postEditFormStore.changePostBody('하핳');

        postEditFormStore.validatePostBody();

        expect(postEditFormStore.errors.postBody).toBeFalsy();

        expect(postEditFormStore.postBody).toBe('하핳');
      });
    });

    context('내용이 비어있을 때', () => {
      it('에러 메시지를 반환한다', () => {
        postEditFormStore.changePostBody('');

        postEditFormStore.validatePostBody();

        expect(postEditFormStore.errors.postBody).toBeTruthy();

        expect(postEditFormStore.errors.postBody).toBe('내용을 입력해 주세요');
      });
    });
  });

  describe('validateTitle', () => {
    context('내용을 올바르게 입력했을 때', () => {
      it('에러 메시지를 반환하지 않는다', () => {
        postEditFormStore.changeTitle('점심메뉴 추천해주세요!');

        postEditFormStore.validateTitle();

        expect(postEditFormStore.errors.title).toBeFalsy();

        expect(postEditFormStore.title).toBe('점심메뉴 추천해주세요!');
      });
    });

    context('내용이 비어있을 때', () => {
      it('에러 메시지를 반환한다', () => {
        postEditFormStore.changeTitle('');

        postEditFormStore.validateTitle();

        expect(postEditFormStore.errors.title).toBeTruthy();

        expect(postEditFormStore.errors.title).toBe('제목을 입력해 주세요');
      });
    });
  });

  describe('fillFields', () => {
    it('제목과 내용을 입력한다', () => {
      const post = {
        id: 1,
        writer: {
          id: 1,
          nickname: 'jenna',
          profileImage: 'https://source.boringavatars.com/beam/120/nickname=jenna',
        },
        postComments: [],
        title: '아바타 보고 왔습니다.',
        postBody: '영상미 대박이예요',
        hit: 1,
        image: 'image.jpg',
        isDeleted: false,
        createdAt: '2022-01-01T17:57:23.929359',
        updatedAt: '2022-01-01T17:57:23.929359',
      };

      postEditFormStore.fillFields(post);

      expect(postEditFormStore.postBody).toBe('영상미 대박이예요');
    });
  });

  describe('reset', () => {
    it('리뷰 내용을 리셋한다', () => {
      postEditFormStore.changePostBody('인생 작품!');
      postEditFormStore.reset();

      expect(postEditFormStore.postBody).toBeFalsy();
    });
  });
});
