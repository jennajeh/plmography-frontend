/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import usePostEditFormStore from '../../hooks/usePostEditFormStore';
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
        <Input
          name="title"
          label="제목"
          type="text"
          value={postEditFormStore.title || ''}
          onChange={(e) => postEditFormStore.changeTitle(e.target.value)}
          maxLength="50"
          errorMessage={postEditFormStore.errors.title}
        />
        <TextArea
          name="postBody"
          label="내용"
          type="text"
          value={postEditFormStore.postBody || ''}
          onChange={(e) => postEditFormStore.changePostBody(e.target.value)}
          maxLength="800"
          errorMessage={postEditFormStore.errors.postBody}
        />
        <UploadImage>
          {showImage !== '' ? (
            <>
              <img
                src={showImage}
                alt="uploadImage"
                height="150px"
              />
              <button type="button" onClick={handleDeleteImage}>
                삭제
              </button>
            </>
          ) : (
            <InputFile
              type="file"
              accept="image/*"
              placeholder="사진 수정"
              multiple
              id="image"
              onChange={handleChangeImage}
            />
          )}
        </UploadImage>
        <Buttons>
          <Modal
            buttonName="취소"
            content="게시물 수정을 취소하시겠습니까?"
            onClose={handleClickCancel}
          />
          <SubmitButton type="submit">등록</SubmitButton>
        </Buttons>
      </Form>
    </Container>
  );
}
