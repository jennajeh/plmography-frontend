import Store from './Store';

export default class LoginFormStore extends Store {
  constructor() {
    super();

    this.fields = {};
    this.errors = {};

    this.errorMessages = {
      email: {
        empty: '이메일을 입력해 주세요.',
      },
      password: {
        empty: '비밀번호를 입력해 주세요.',
      },
      emailAndPassword: {
        empty: '이메일과 비밀번호를 입력해 주세요.',
      },
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

  reset() {
    this.fields = {};
    this.errors = {};

    this.publish();
  }

  validate() {
    this.validateEmail();
    this.validatePassword();
    this.validateEmailAndPassword();

    this.publish();
  }

  validateEmail() {
    if (!this.fields.email?.length) {
      this.errors.email = this.errorMessages.email.empty;

      return;
    }

    this.errors.email = '';
  }

  validatePassword() {
    if (!this.fields.password?.length) {
      this.errors.password = this.errorMessages.password.empty;

      return;
    }

    this.errors.password = '';
  }

  validateEmailAndPassword() {
    if (!this.fields.email?.length && !this.fields.password?.length) {
      this.errors.emailAndPassword = this.errorMessages.emailAndPassword.empty;

      return;
    }

    this.errors.emailAndPassword = '';
  }

  get errorMessage() {
    if (this.errors.emailAndPassword) {
      return this.errors.emailAndPassword;
    }

    if (this.errors.email) {
      return this.errors.email;
    }

    if (this.errors.password) {
      return this.errors.password;
    }

    return '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const loginFormStore = new LoginFormStore();
