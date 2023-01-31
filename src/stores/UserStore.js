import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.user = {};
    this.users = [];

    this.nickname = '';
    this.profileImage = '';

    this.loginStatus = '';
    this.signupStatus = '';
    this.editStatus = '';
  }

  async signup({
    email, nickname, password, gender, birthYear,
  }) {
    this.changeSignupStatus('processing');

    try {
      const { data } = await userApiService.createUser({
        email, nickname, password, gender, birthYear,
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

  async changeProfile(nickname, formData) {
    this.changeEditStatus('processing');

    try {
      const { profileImage } = await userApiService.uploadImage(formData);

      const { data } = await userApiService.changeProfile(nickname, profileImage);

      this.nickname = data.nickname;
      this.profileImage = data.profileImage;

      this.changeEditStatus('successful');

      this.publish();
    } catch (e) {
      this.changeEditStatus('failed');

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
