import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('login', () => {
    context('올바른 아이디와 비밀번호 입력시', () => {
      it('로그인 성공', async () => {
        await userStore.login({
          email: 'jenna@gmail.com',
          password: 'Test123!',
        });

        expect(userStore.loginSuccessful).toBeTruthy();
      });
    });

    context('이메일이 틀렸을 때', () => {
      it('로그인 실패', async () => {
        await userStore.login({
          email: 'xxx@gmail.com',
          password: 'Test123!',
        });

        expect(userStore.loginFailed).toBeTruthy();
      });
    });

    context('비밀번호가 틀렸을 때', () => {
      it('로그인 실패', async () => {
        await userStore.login({
          email: 'jenna@gmail.com',
          password: 'TEST123!',
        });

        expect(userStore.loginFailed).toBeTruthy();
      });
    });
  });

  describe('fetchUser(userId)', () => {
    it('해당 유저의 상세 프로필을 보여준다', async () => {
      await userStore.fetchUser(1);

      expect(userStore.user.id).toBe(1);
    });
  });

  describe('updateUser', () => {
    it('해당 유저의 프로필 정보를 바꾼다', async () => {
      await userStore.updateUser({
        userId: 1,
        password: 'Asdf123!',
        nickname: '강보니',
        profileImage: 'https://source.boringavatars.com/beam/120/nickname=bboni',
      });

      expect(userStore.user.nickname).toBe('강보니');
    });
  });

  describe('resetSignupStatus', () => {
    it('회원가입 상태를 바꾼다', () => {
      userStore.changeSignupStatus('processing');

      expect(userStore.signupStatus).toBe('processing');

      userStore.resetSignupStatus();

      expect(userStore.signupStatus).toBe('');
    });
  });

  describe('resetLoginStatus', () => {
    it('로그인 상태를 바꾼다', () => {
      userStore.changeLoginStatus('processing');

      expect(userStore.loginStatus).toBe('processing');

      userStore.resetLoginStatus();

      expect(userStore.loginStatus).toBe('');
    });
  });
});
