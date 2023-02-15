/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import usePostFormStore from '../../hooks/usePostFormStore';
import usePostStore from '../../hooks/usePostStore';
import Input from '../common/Input';
import Modal from '../common/Modal';
import TextArea from '../common/TextArea';
import { EditFile } from '../../assets/community';
import Button from '../common/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Form = styled.form`
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #191d26;
  border-radius: 10px;

  input {
    border: none;
    padding-inline: 1.6rem;
    background-color: #191d26;
    font-size: 18px;
  }
`;

const Label = styled.label`
  display: block;
  cursor: pointer;

  img {
    width: 1.5rem;
  }
`;

const InputFile = styled.input`
  display: none;
  margin-top: 1em;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const UploadImage = styled.div`
  display: flex;
  margin: 1em;
  img {
    width: fit-content;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding-top: 1em;
  border-top: 1px solid #CCC;
`;

export default function PostForm() {
  const [showImage, setShowImage] = useState('');
  const navigate = useNavigate();
  const postStore = usePostStore();
  const postFormStore = usePostFormStore();

  const handleClickCancel = () => {
    navigate('/community');
  };

  const handleDeleteImage = () => {
    setShowImage('');
  };

  const handleChangeImage = (e) => {
    const img = e.target.files[0];

    postFormStore.changeImage(img);

    const currentImageUrl = URL.createObjectURL(img);

    setShowImage(currentImageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await postFormStore.validate();

    if (postFormStore.isValidateSuccessful) {
      const { title, postBody, image } = postFormStore;

      await postStore.create(title, postBody, image);

      navigate('/community');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            height={50}
            name="title"
            type="text"
            value={postFormStore.title || ''}
            onChange={(e) => postFormStore.changeTitle(e.target.value)}
            maxLength="50"
            errorMessage={postFormStore.errors.title}
            placeholder="제목을 입력해 주세요"
          />
          <TextArea
            name="postBody"
            type="text"
            value={postFormStore.postBody || ''}
            onChange={(e) => postFormStore.changePostBody(e.target.value)}
            maxLength="800"
            errorMessage={postFormStore.errors.postBody}
            placeholder="800자 내외로 내용을 입력해 주세요"
          />
        </InputContainer>
        <ButtonBox>
          <Label htmlFor="image">
            <img src={EditFile} alt="EditFile" />
          </Label>
          <InputFile
            type="file"
            accept="image/*"
            placeholder="파일 선택"
            multiple
            id="image"
            onChange={handleChangeImage}
          />
          <Button
            width={70}
            height={30}
            bgcolor="#5e677c"
            type="button"
            onClick={handleDeleteImage}
          >
            삭제
          </Button>
        </ButtonBox>
        <UploadImage>
          {showImage !== '' ? (
            <img
              src={showImage}
              alt="uploadImage"
              height="150px"
            />
          ) : null}
        </UploadImage>
        <Buttons>
          <Button
            width={70}
            height={30}
            bgcolor="#5e677c"
            type="submit"
          >
            등록
          </Button>
          <Modal
            buttonName="취소"
            content="게시물 등록을 취소하시겠습니까?"
            onClose={handleClickCancel}
          />
        </Buttons>
      </Form>
    </Container>
  );
}
