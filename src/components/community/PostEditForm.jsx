/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { EditFile } from '../../assets/community';
import usePostEditFormStore from '../../hooks/usePostEditFormStore';
import usePostStore from '../../hooks/usePostStore';
import Button from '../common/Button';
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
    color: white;
    font-size: 18px;
  }

  textarea {
    color: white;
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

export default function PostEditForm() {
  const [showImage, setShowImage] = useState('');
  const navigate = useNavigate();
  const postStore = usePostStore();
  const postEditFormStore = usePostEditFormStore();
  const { id } = useParams();

  const postId = Number(id);
  const { post } = postStore;

  const handleClickCancel = () => {
    navigate(`/community/posts/${id}`);
  };

  const handleDeleteImage = () => {
    setShowImage('');
    postEditFormStore.changeImage('');
  };

  const handleChangeImage = (e) => {
    const img = e.target.files[0];

    postEditFormStore.changeImage(img);

    const currentImageUrl = URL.createObjectURL(img);

    setShowImage(currentImageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await postEditFormStore.validate();

    if (postEditFormStore.isValidateSuccessful) {
      const { title, postBody, image } = postEditFormStore;

      await postStore.modify(postId, title, postBody, image);

      navigate(`/community/posts/${id}`);
    }
  };

  useEffect(() => {
    postEditFormStore.fillFields(post);
    setShowImage(post.image);
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            height={50}
            width={1000}
            name="title"
            type="text"
            value={postEditFormStore.title || ''}
            onChange={(e) => postEditFormStore.changeTitle(e.target.value)}
            maxLength="50"
            errorMessage={postEditFormStore.errors.title}
          />
          <TextArea
            name="postBody"
            type="text"
            value={postEditFormStore.postBody || ''}
            onChange={(e) => postEditFormStore.changePostBody(e.target.value)}
            maxLength="800"
            errorMessage={postEditFormStore.errors.postBody}
          />
        </InputContainer>
        <ButtonBox>
          <Label htmlFor="image">
            <img src={EditFile} alt="EditFile" />
          </Label>
          <InputFile
            type="file"
            accept="image/*"
            placeholder="사진 수정"
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
            수정
          </Button>
          <Modal
            buttonName="취소"
            content="게시물 수정을 취소하시겠습니까?"
            onClose={handleClickCancel}
          />
        </Buttons>
      </Form>
    </Container>
  );
}
