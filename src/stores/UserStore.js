/* eslint-disable max-len */
import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.user = {};
    this.users = [];

    this.nickname = '';
    this.profileImage = '';

    this.countEmail = 0;
    this.countNickname = 0;

    this.loginStatus = '';
    this.signupStatus = '';
    this.editStatus = '';
  }

  async sendKakaoAuthorizationCode(code) {
    this.changeLoginStatus('processing');

    try {
      const { accessToken } = await userApiService.sendKakaoAuthorizationCode(code);

      this.changeLoginStatus('successful');

      return accessToken;
    } catch (e) {
      this.changeLoginStatus('failed');

      return '';
    }
  }

  async signup({
    email, nickname, password, passwordCheck,
  }) {
    this.changeSignupStatus('processing');

    try {
      const { data } = await userApiService.createUser({
        email, nickname, password, passwordCheck,
      });

      this.changeSignupStatus('successful');

      return data;
    } catch (e) {
      this.changeSignupStatus('failed');

      return '';
    }
  }

  async login({ email, password }) {
    this.changeLoginStatus('processing');

    try {
      const { accessToken } = await userApiService.postSession({ email, password });

      this.changeLoginStatus('successful');

      return accessToken;
    } catch (e) {
      this.changeLoginStatus('failed');

      return '';
    }
  }

  async fetchMe() {
    const { data } = await userApiService.fetchMe();

    this.user = data;

    this.publish();
  }

  async fetchUser(userNickname) {
    const { data } = await userApiService.fetchUser(userNickname);

    this.user = data;

    this.publish();
  }

  async fetchUsers() {
    const users = await userApiService.fetchUsers();

    this.users = users;

    this.publish();
  }

  async checkDuplicate({ email, nickname }) {
    const { countEmail, countNickname } = await userApiService.countEmailAndNickname({ email, nickname });

    this.countEmail = countEmail;
    this.countNickname = countNickname;

    this.publish();
  }

  async changeProfile({ nickname, image }) {
    this.startModify();

    try {
      if (typeof image !== 'string') {
        const formData = new FormData();

        formData.append('multipartFile', image);

        const profileImage = await userApiService.uploadImage(formData);

        await userApiService.changeProfile({ nickname, profileImage });

        this.completeModify();

        return;
      }

      await userApiService.changeProfile({ nickname, profileImage: image });

      this.completeModify();

      this.publish();
    } catch (e) {
      this.failModify();

      this.publish();
    }
  }

  resetLoginStatus() {
    this.loginStatus = '';

    this.publish();
  }

  changeLoginStatus(status) {
    this.loginStatus = status;

    this.publish();
  }

  resetSignupStatus() {
    this.signupStatus = '';

    this.publish();
  }

  changeSignupStatus(status) {
    this.signupStatus = status;

    this.publish();
  }

  startModify() {
    this.editStatus = 'processing';
  }

  completeModify() {
    this.editStatus = 'successful';
  }

  failModify() {
    this.editStatus = 'failed';
  }

  resetEditStatus() {
    this.editStatus = '';

    this.publish();
  }

  get signupSuccessful() {
    return this.signupStatus === 'successful';
  }

  get signupFailed() {
    return this.signupStatus === 'failed';
  }

  get loginSuccessful() {
    return this.loginStatus === 'successful';
  }

  get loginFailed() {
    return this.loginStatus === 'failed';
  }

  get updateSuccessful() {
    return this.editStatus === 'successful';
  }

  get updateFailed() {
    return this.editStatus === 'failed';
  }
}

export const userStore = new UserStore();
