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
import Title from '../common/Title';
import { UpdateButton } from '../../assets/profile';

const Container = styled.form`
  color: ${((props) => props.theme.text.white)};
  width: 900px;
  height: 500px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 50px;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  cursor: pointer;

  img {
    border-radius: 50%;
  }
`;

const ImageInput = styled.input`
  display: none;
  border-radius: 50px;
  background-color: white;
`;

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const UpdateImage = styled.img`
  width: 20px;
  position: relative;
  left: -25px;
  top: 5px;

`;

const NicknameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ProfileImageButton = styled.img`
  width: 80px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: none;
  color: ${((props) => props.theme.text.white)};
  background-color: ${((props) => props.theme.text.sixthGrey)};
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
      || nickname === user.nickname && image === user.profileImage || image === user.profileImage || confirmStatus && profileEditFormStore.isValidateSuccessful) {
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
    <Container onSubmit={handleSubmit}>
      <ProfileImage>
        <Title size={30} weight="bold">프로필 수정</Title>
      </ProfileImage>
      <div>
        <Label htmlFor="input-image">
          {showImage !== '' ? (
            <div>
              <ProfileImageButton
                src={showImage}
                alt="uploadImage"
              />
              <UpdateImage
                src={UpdateButton}
                alt="uploadImage"
              />
            </div>
          ) : (
            <div>
              <ProfileImageButton
                src={user.profileImage}
                alt="profileImage"
              />
              <UpdateImage
                src={UpdateButton}
                alt="profileImage"
              />

            </div>
          )}
        </Label>
        <ImageInput
          id="input-image"
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>
      <NicknameBox>
        <Label htmlFor="input-nickname">닉네임</Label>
        <Input
          width={300}
          height={40}
          name="nickname"
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
      </NicknameBox>
      <ButtonBox>
        <Button type="submit">
          저장
        </Button>
        <Modal
          buttonName="취소"
          content="프로필 수정을 취소하시겠습니까?"
          onClose={handleClickCancel}
        />
      </ButtonBox>
    </Container>
  );
}
