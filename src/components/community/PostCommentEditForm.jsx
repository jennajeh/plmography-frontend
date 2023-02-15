/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import styled from 'styled-components';
import usePostCommentEditFormStore from '../../hooks/usePostCommentEditFormStore';
import Button from '../common/Button';
import Input from '../common/Input';

const Label = styled.label`
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  gap: 15px;
  margin-bottom: 1em;
`;

export default function PostCommentEditForm({ onSubmit, comment }) {
  const postCommentEditFormStore = usePostCommentEditFormStore();

  useEffect(() => {
    postCommentEditFormStore.fillFields(comment);
  }, []);

  return (
    <Form onSubmit={onSubmit}>
      <Label htmlFor="input-comment">댓글 수정</Label>
      <Input
        height={30}
        name="input-comment"
        type="text"
        value={postCommentEditFormStore.body || ''}
        onChange={(e) => postCommentEditFormStore.changeBody(e.target.value)}
        errorMessage={postCommentEditFormStore.errors.body}
      />
      <Button
        width={70}
        height={30}
        bgcolor="#5e677c"
        type="submit"
      >
        수정
      </Button>
    </Form>
  );
}
