import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class SignupFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      email: {
        empty: '이메일을 입력해 주세요.',
        invalid: '이메일이 올바르지 않습니다.',
        exist: '이미 존재하는 이메일 입니다.',
      },
      password: {
        empty: '비밀번호를 입력해 주세요.',
        invalid: '8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다.',
      },
      passwordCheck: {
        empty: '비밀번호를 입력해 주세요.',
        notMatched: '비밀번호가 일치하지 않습니다.',
      },
      nickname: {
        empty: '닉네임을 입력해 주세요.',
        invalid: '특수문자 제외, 3~12 자 이내여야 합니다.',
        exist: '이미 존재하는 닉네임 입니다.',
      },
    };

    this.patterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      nickname: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{3,12}$/,
    };

    this.reset();
  }

  changeEmail(email) {
    this.fields.email = email;
    this.validateEmail();

    this.publish();
  }

  changePassword(password) {
    this.fields.password = password;
    this.validatePassword();

    this.publish();
  }

  changePasswordCheck(passwordCheck) {
    this.fields.passwordCheck = passwordCheck;
    this.validatePasswordCheck();

    this.publish();
  }

  changeNickname(nickname) {
    this.fields.nickname = nickname;
    this.validateNickname();

    this.publish();
  }

  reset() {
    this.fields = {};
    this.errors = {};
    this.timer = null;

    this.publish();
  }

  async validate() {
    this.validateNickname();
    this.validateEmail();
    this.validatePassword();
    this.validatePasswordCheck();

    this.publish();
  }

  async validateNickname() {
    if (!this.fields.nickname?.length) {
      this.errors.nickname = this.errorMessages.nickname.empty;

      return;
    }

    if (!this.patterns.nickname.test(this.fields.nickname)) {
      this.errors.nickname = this.errorMessages.nickname.invalid;

      return;
    }
    const inputNickname = this.fields.nickname;

    const { countNickname } = await userApiService
      .countEmailAndNickname({ email: 'not@gmail.com', nickname: inputNickname });

    if (countNickname > 0) {
      this.errors.nickname = this.errorMessages.nickname.exist;

      return;
    }

    this.errors.nickname = '';
  }

  async validateEmail() {
    if (!this.fields.email?.length) {
      this.errors.email = this.errorMessages.email.empty;

      return;
    }

    if (!this.patterns.email.test(this.fields.email)) {
      this.errors.email = this.errorMessages.email.invalid;

      return;
    }

    const inputEmail = this.fields.email;

    const { countEmail } = await userApiService
      .countEmailAndNickname({ email: inputEmail, nickname: 'notYet' });

    if (countEmail !== 0) {
      this.errors.email = this.errorMessages.email.exist;

      return;
    }

    this.errors.email = '';
  }

  validatePassword() {
    if (!this.fields.password?.length) {
      this.errors.password = this.errorMessages.password.empty;

      return;
    }

    if (!this.patterns.password.test(this.fields.password)) {
      this.errors.password = this.errorMessages.password.invalid;

      return;
    }

    this.errors.password = '';
  }

  validatePasswordCheck() {
    if (!this.fields.passwordCheck?.length) {
      this.errors.passwordCheck = this.errorMessages.passwordCheck.empty;

      return;
    }

    if (this.fields.passwordCheck !== this.fields.password) {
      this.errors.passwordCheck = this.errorMessages.passwordCheck.notMatched;

      return;
    }

    this.errors.passwordCheck = '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const signupFormStore = new SignupFormStore();
