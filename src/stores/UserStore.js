import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.nickname = '';
    this.profileImage = '';
    this.password = '';

    this.user = {};

    this.loginStatus = '';
    this.signupStatus = '';
    this.editStatus = '';
  }

  async signup({
    email, nickname, password,
  }) {
    this.changeSignupStatus('processing');

    try {
      const { id } = await userApiService.createUser({
        email, nickname, password,
      });

      this.changeSignupStatus('successful');

      return id;
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

  async fetchUser(userId) {
    const user = await userApiService.fetchUser(userId);

    this.user = user;

    this.publish();
  }

  async updateUser({
    userId, password, nickname, profileImage,
  }) {
    this.changeEditStatus('processing');

    try {
      const { data } = await userApiService.updateUser({
        userId, password, nickname, profileImage,
      });

      this.password = data.password;
      this.nickname = data.nickname;
      this.profileImage = data.profileImage;

      this.changeEditStatus('successful');

      return data;
    } catch (e) {
      this.changeEditStatus('failed');

      return '';
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

  resetEditStatus() {
    this.editStatus = '';

    this.publish();
  }

  changeEditStatus(status) {
    this.editStatus = status;

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
