import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../../hooks/useUserStore';
import useProfileEditFormStore from '../../hooks/useProfileEditFormStore';
import Input from '../common/Input';

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
  const navigate = useNavigate();
  const userStore = useUserStore();
  const profileEditFormStore = useProfileEditFormStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await profileEditFormStore.validate();

    if (profileEditFormStore.isValidateSuccessful) {
      const { fields } = profileEditFormStore;

      const { nickname, profileImage } = fields;

      const formData = new FormData();

      formData.append('multipartFile', profileImage);

      await userStore.changeProfile(nickname, formData);

      navigate('/myProfile');
    }
  };

  const handleClickCancel = () => {
    profileEditFormStore.reset();

    navigate('/myProfile');
  };

  return (
    <Container>
      <h1>프로필 수정</h1>
      <form onSubmit={handleSubmit}>
        <img alt="profile" src={profileEditFormStore.fields.profileImage} width={50} height={50} />
        <Label htmlFor="input-image">
          이미지 수정
        </Label>
        <ImageInput
          id="input-image"
          type="file"
          accept="image/*"
          onChange={(e) => profileEditFormStore.changeImage(e.target.files[0])}
        />
        <Input
          name="nickname"
          label="닉네임"
          type="text"
          value={profileEditFormStore.fields.nickname || ''}
          onChange={(e) => profileEditFormStore.changeNickName(e.target.value)}
          message="특수문자를 제외하고 입력해 주세요"
          errorMessage={profileEditFormStore.errors.nickname}
        />
        <div>
          <button type="submit">
            저장
          </button>
          <button type="button" onClick={handleClickCancel}>
            취소
          </button>
        </div>
      </form>
    </Container>
  );
}
