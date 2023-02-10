/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useUserStore from '../../hooks/useUserStore';
import useProfileEditFormStore from '../../hooks/useProfileEditFormStore';
import Input from '../common/Input';
import Modal from '../common/Modal';
import ProfileModal from './ProfileModal';

const Container = styled.div`
  width: 30em;
`;

const Label = styled.label`
  display: block;
  cursor: pointer;
`;

const ImageInput = styled.input`
  display: none;
`;

export default function ProfileEditForm() {
  const [showImage, setShowImage] = useState('');
  const [confirmStatus, setConfirmStatus] = useState(false);
  const navigate = useNavigate();
  const userStore = useUserStore();
  const profileEditFormStore = useProfileEditFormStore();

  const { user, countNickname } = userStore;
  const { fields } = profileEditFormStore;

  const { nickname, image } = fields;

  const handleChangeImage = (e) => {
    const img = e.target.files[0];

    profileEditFormStore.changeImage(img);

    const currentImageUrl = URL.createObjectURL(img);

    setShowImage(currentImageUrl);
  };

  const handleChangeNickname = async (e) => {
    const newNickname = e.target.value;

    profileEditFormStore.changeNickName(newNickname);

    await userStore.checkDuplicate({ email: user.email, nickname: newNickname });
  };

  const handleClickConfirmed = () => {
    setConfirmStatus(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    profileEditFormStore.validateNickName();

    if (nickname === user.nickname && showImage
      || nickname === user.nickname && image === user.profileImage || confirmStatus && profileEditFormStore.isValidateSuccessful) {
      await userStore.changeProfile({ nickname, image });

      navigate('/profile');
    }
  };

  useEffect(() => {
    profileEditFormStore.fillFields(user);
  }, []);

  const handleClickCancel = () => {
    profileEditFormStore.reset();

    navigate('/profile');
  };

  return (
    <Container>
      <h1>프로필 수정</h1>
      <form onSubmit={handleSubmit}>
        {showImage !== '' ? (
          <img
            src={showImage}
            alt="uploadImage"
            width={50}
            height={50}
          />
        ) : (
          <img
            src={user.profileImage}
            alt="profileImage"
            width={50}
            height={50}
          />
        )}
        <Label htmlFor="input-image">
          이미지 수정
        </Label>
        <ImageInput
          id="input-image"
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
        />
        <Input
          name="nickname"
          label="닉네임"
          type="text"
          value={profileEditFormStore.fields.nickname || ''}
          onChange={handleChangeNickname}
          message="특수문자를 제외하고 입력해 주세요"
          errorMessage={profileEditFormStore.errors.nickname}
        />
        {nickname !== user.nickname && (
          <ProfileModal
            buttonName="중복 검사"
            countNickname={countNickname}
            onClose={handleClickConfirmed}
          />
        )}
        <div>
          <button type="submit">
            저장
          </button>
          <Modal
            buttonName="취소"
            content="프로필 수정을 취소하시겠습니까?"
            onClose={handleClickCancel}
          />
        </div>
      </form>
    </Container>
  );
}
