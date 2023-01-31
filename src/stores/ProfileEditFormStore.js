import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class ProfileEditFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      nickname: {
        empty: '닉네임을 입력해주세요',
        invalid: '닉네임을 다시 확인해주세요',
      },
    };

    this.patterns = {
      nickname: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
    };

    this.reset();
  }

  reset() {
    this.fields = {};
    this.errors = {};

    this.publish();
  }

  fillFields(user) {
    this.fields = {
      nickname: user.nickname,
      profileImage: user.profileImage,
    };

    this.publish();
  }

  changeNickName(nickname) {
    this.fields.nickname = nickname;
    this.validateNickName();

    this.publish();
  }

  async changeImage(imageFile) {
    // const formData = new FormData();

    // formData.append('multipartFile', imageFile);

    // const profileImage = await userApiService.uploadImage(formData);

    this.fields.profileImage = imageFile;

    this.publish();
  }

  validate() {
    this.validateNickName();

    this.publish();
  }

  validateNickName() {
    if (!this.fields.nickname?.length) {
      this.errors.nickname = this.errorMessages.nickname.empty;

      return;
    }

    if (!this.patterns.nickname.test(this.fields.nickname)) {
      this.errors.nickname = this.errorMessages.nickname.invalid;

      return;
    }

    this.errors.nickname = '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const profileEditFormStore = new ProfileEditFormStore();
