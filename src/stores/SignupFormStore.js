import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class SignupFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      email: {
        empty: '이메일을 입력해 주세요.',
        invalid: '이메일을 다시 확인해 주세요.',
        exist: '이미 존재하는 이메일 입니다.',
      },
      password: {
        empty: '비밀번호를 입력해 주세요.',
        invalid: '비밀번호를 다시 확인해 주세요.',
      },
      passwordCheck: {
        empty: '비밀번호를 입력해 주세요.',
        notMatched: '비밀번호가 일치하지 않습니다.',
      },
      nickname: {
        empty: '닉네임을 입력해 주세요.',
        invalid: '닉네임을 다시 확인해 주세요.',
        exist: '이미 존재하는 닉네임 입니다.',
      },
      gender: {
        notSelected: '성별을 선택해 주세요.',
      },
      birth: {
        notSelected: '출생연도를 선택해 주세요.',
      },
    };

    this.patterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      nickname: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
    };

    this.reset();
  }

  changeEmail(email) {
    this.fields.email = email;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(async () => {
      await this.validateEmail();

      this.publish();
    }, 500);

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

  changeGender(gender) {
    this.fields.gender = gender;
    this.validateGender();

    this.publish();
  }

  changeBirth(birth) {
    this.fields.birth = birth;
    this.validateBirth();

    this.publish();
  }

  reset() {
    this.fields = {};
    this.errors = {};
    this.timer = null;

    this.publish();
  }

  async validate() {
    await this.validateNickname();
    await this.validateEmail();
    this.validatePassword();
    this.validatePasswordCheck();
    this.validateGender();
    this.validateBirth();

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

    const fieldEmail = this.fields.email;
    const fieldNickname = this.fields.nickname;

    const { countNickname } = await userApiService
      .countEmailAndNickname({ fieldEmail, fieldNickname });

    if (countNickname !== 0) {
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

    const fieldEmail = this.fields.email;
    const fieldNickname = this.fields.nickname;

    const { countEmail } = await userApiService
      .countEmailAndNickname({ fieldEmail, fieldNickname });

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

  validateGender() {
    if (!this.fields.gender?.checked) {
      this.errors.gender = this.errorMessages.gender.notSelected;

      return;
    }

    this.errors.gender = '';
  }

  validateBirth() {
    if (!this.fields.birth?.checked) {
      this.errors.gender = this.errorMessages.birth.notSelected;

      return;
    }

    this.errors.birth = '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const signupFormStore = new SignupFormStore();
