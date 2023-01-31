import ProfileEditFormStore from './ProfileEditFormStore';

const context = describe;

describe('ProfileEditFormStore', () => {
  let profileEditFormStore;

  beforeEach(() => {
    jest.clearAllMocks();
    profileEditFormStore = new ProfileEditFormStore();
  });

  describe('reset', () => {
    it('필드를 리셋한다', () => {
      profileEditFormStore.changeNickName('jenna');
      profileEditFormStore.reset();

      expect(profileEditFormStore.fields.nickname).toBeFalsy();
    });
  });

  describe('fillFields', () => {
    it('필드에 입력한다', () => {
      const user = {
        id: 1,
        nickname: 'jenna',
        birthYear: 1990,
        gender: '여성',
        email: 'jenna@gmail.com',
        profileImage: 'https://source.boringavatars.com/beam/120/nickname=jenna',
      };

      profileEditFormStore.fillFields(user);

      expect(profileEditFormStore.fields.profileImage).toBe('https://source.boringavatars.com/beam/120/nickname=jenna');
      expect(profileEditFormStore.fields.nickname).toBe('jenna');
    });
  });

  describe('changeNickName', () => {
    it('닉네임을 변경한다', () => {
      profileEditFormStore.changeNickName('zzezze');

      expect(profileEditFormStore.fields.nickname).toBe('zzezze');
    });
  });

  describe('validateNickName', () => {
    context('닉네임 형식이 올바른 경우', () => {
      it('에러 메시지가 출력되지 않는다', () => {
        profileEditFormStore.changeNickName('best');

        profileEditFormStore.validateNickName();

        expect(profileEditFormStore.errors.nickname).toBeFalsy();
      });
    });

    context('닉네임이 비어있을 경우', () => {
      it('에러 메시지가 출력된다', () => {
        profileEditFormStore.changeNickName('');

        profileEditFormStore.validateNickName();

        expect(profileEditFormStore.errors.nickname).toBeTruthy();
      });
    });

    context('닉네임 형식이 올바르지 않은 경우', () => {
      it('에러 메시지가 출력된다', () => {
        profileEditFormStore.changeNickName('@추천왕@');

        profileEditFormStore.validateNickName();

        expect(profileEditFormStore.errors.nickname).toBeTruthy();
      });
    });
  });
});
