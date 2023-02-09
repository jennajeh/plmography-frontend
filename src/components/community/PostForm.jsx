/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import usePostFormStore from '../../hooks/usePostFormStore';
import usePostStore from '../../hooks/usePostStore';
import Input from '../common/Input';
import Modal from '../common/Modal';
import TextArea from '../common/TextArea';

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

const InputFile = styled.input`
  display: flex;
  margin-top: 1em;
`;

const UploadImage = styled.div`
  display: flex;
  margin-top: 1em;
  img {
    width: 100px;
    height: 100px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px solid #CCC;

  button {
    padding: 0.8em 0;
    color: #FFF;
  }
`;

const SubmitButton = styled.button`
  width: 47%;
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
        <Input
          name="title"
          label="제목"
          type="text"
          value={postFormStore.title || ''}
          onChange={(e) => postFormStore.changeTitle(e.target.value)}
          maxLength="50"
          errorMessage={postFormStore.errors.title}
          placeholder="50자 내외로 제목을 입력해 주세요"
        />
        <TextArea
          name="postBody"
          label="내용"
          type="text"
          value={postFormStore.postBody || ''}
          onChange={(e) => postFormStore.changePostBody(e.target.value)}
          maxLength="800"
          errorMessage={postFormStore.errors.postBody}
          placeholder="800자 내외로 내용을 입력해 주세요"
        />
        <InputFile
          type="file"
          accept="image/*"
          placeholder="파일 선택"
          multiple
          id="image"
          onChange={handleChangeImage}
        />
        <button type="button" onClick={handleDeleteImage}>
          삭제
        </button>
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
          <Modal
            buttonName="취소"
            content="게시물 등록을 취소하시겠습니까?"
            onClose={handleClickCancel}
          />
          <SubmitButton type="submit">등록</SubmitButton>
        </Buttons>
      </Form>
    </Container>
  );
}
