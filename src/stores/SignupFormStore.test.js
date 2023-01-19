import SignupFormStore from './SignupFormStore';

const context = describe;

describe('SignupFormStore', () => {
  let signupFormStore;

  beforeEach(() => {
    signupFormStore = new SignupFormStore();
  });

  describe('changeNickname', () => {
    it('닉네임을 변경한다', () => {
      signupFormStore.changeNickname('전제나');

      expect(signupFormStore.fields.nickname).toBe('전제나');
    });
  });

  describe('changeEmail', () => {
    it('이메일을 변경한다', () => {
      signupFormStore.changeEmail('jenna@gmail.com');

      expect(signupFormStore.fields.email).toBe('jenna@gmail.com');
    });
  });

  describe('changePassword', () => {
    it('비밀번호를 변경한다', () => {
      signupFormStore.changePassword('Test123!');

      expect(signupFormStore.fields.password).toBe('Test123!');
    });
  });

  describe('changePasswordCheck', () => {
    it('비밀번호를 변경한다', () => {
      signupFormStore.changePasswordCheck('Test123!');

      expect(signupFormStore.fields.passwordCheck).toBe('Test123!');
    });
  });

  describe('reset', () => {
    it('모든 필드를 리셋한다', () => {
      signupFormStore.changePasswordCheck('Test123!');
      signupFormStore.reset();

      expect(signupFormStore.fields.passwordCheck).toBeFalsy();
    });
  });

  describe('validateNickname', () => {
    context('올바른 닉네임 입력시', () => {
      it('닉네임 오류가 발생하지 않는다', () => {
        signupFormStore.changeNickname('전제나');

        signupFormStore.validateNickname();

        expect(signupFormStore.errors.nickname).toBeFalsy();
      });
    });

    context('닉네임 필드가 비어있을 시', () => {
      it('닉네임 에러가 발생한다', () => {
        signupFormStore.changeNickname('');

        signupFormStore.validateNickname();

        expect(signupFormStore.errors.nickname).toBeTruthy();
      });
    });

    context('닉네임에 특수문자가 있을 시', () => {
      it('닉네임 에러가 발생한다', () => {
        signupFormStore.changeNickname('전@제나!');

        signupFormStore.validateNickname();

        expect(signupFormStore.errors.nickname).toBeTruthy();
      });
    });
  });

  describe('validateEmail', () => {
    context('올바른 이메일 입력시', () => {
      it('does not set email error', () => {
        signupFormStore.changeEmail('jenna@example.com');

        signupFormStore.validateEmail();

        expect(signupFormStore.errors.email).toBeFalsy();
      });
    });

    context('이메일 필드가 비어있을 시', () => {
      it('이메일 에러가 발생한다', () => {
        signupFormStore.changeEmail('');

        signupFormStore.validateEmail();

        expect(signupFormStore.errors.email).toBeTruthy();
      });
    });

    context('올바르지 않은 이메일 입력시', () => {
      it('이메일 에러가 발생한다', () => {
        signupFormStore.changeEmail('invalidEmail');

        signupFormStore.validateEmail();

        expect(signupFormStore.errors.email).toBeTruthy();
      });
    });
  });

  describe('validatePassword', () => {
    context('올바른 비밀번호 입력시', () => {
      it('비밀번호 에러가 발생하지 않는다', () => {
        signupFormStore.changePassword('Test123!');

        signupFormStore.validatePassword();

        expect(signupFormStore.errors.password).toBeFalsy();
      });
    });

    context('비밀번호 필드에 공백이 있을시', () => {
      it('비밀번호 에러가 발생한다', () => {
        signupFormStore.changePassword('');

        signupFormStore.validatePassword();

        expect(signupFormStore.errors.password).toBeTruthy();
      });
    });

    context('비밀번호 길이가 짧으면', () => {
      it('비밀번호 에러가 발생한다', () => {
        signupFormStore.changePassword('test');

        signupFormStore.validatePassword();

        expect(signupFormStore.errors.password).toBeTruthy();
      });
    });

    context('비밀번호가 소문자가 없으면', () => {
      it('비밀번호 에러가 발생한다', () => {
        signupFormStore.changePassword('TEST123!');

        signupFormStore.validatePassword();

        expect(signupFormStore.errors.password).toBeTruthy();
      });
    });

    context('비밀번호에 대문자가 없으면', () => {
      it('비밀번호 에러가 발생한다', () => {
        signupFormStore.changePassword('test123!');

        signupFormStore.validatePassword();

        expect(signupFormStore.errors.password).toBeTruthy();
      });
    });

    context('비밀번호에 숫자가 없으면', () => {
      it('비밀번호 에러가 발생한다', () => {
        signupFormStore.changePassword('TestTest!!');

        signupFormStore.validatePassword();

        expect(signupFormStore.errors.password).toBeTruthy();
      });
    });

    context('비밀번호에 특수문자가 없으면', () => {
      it('비밀번호 에러가 발생한다', () => {
        signupFormStore.changePassword('TestTest1');

        signupFormStore.validatePassword();

        expect(signupFormStore.errors.password).toBeTruthy();
      });
    });
  });

  describe('validatePasswordCheck', () => {
    context('비밀번호와 비밀번호 확인이 같으면', () => {
      it('비밀번호 에러가 발생하지 않는다', () => {
        signupFormStore.changePassword('Test123!');
        signupFormStore.changePasswordCheck('Test123!');

        signupFormStore.validatePasswordCheck();

        expect(signupFormStore.errors.passwordCheck).toBeFalsy();
      });
    });

    context('비밀번호 확인 필드가 비어있을 시', () => {
      it('비밀번호 에러가 발생한다', () => {
        signupFormStore.changePasswordCheck('');

        signupFormStore.validatePasswordCheck();

        expect(signupFormStore.errors.passwordCheck).toBeTruthy();
      });
    });

    context('비밀번호와 비밀번호 확인이 다르면', () => {
      it('비밀번호 에러가 발생한다', () => {
        signupFormStore.changePassword('Test123!');
        signupFormStore.changePasswordCheck('Asdf123!');

        signupFormStore.validatePasswordCheck();

        expect(signupFormStore.errors.passwordCheck).toBeTruthy();
      });
    });
  });
});
