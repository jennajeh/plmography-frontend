/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import usePostCommentFormStore from '../../hooks/usePostCommentFormStore';
import Button from '../common/Button';
import Input from '../common/Input';

const Container = styled.div`
  padding-bottom: 2rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap:15px;
`;

const ButtonBox = styled.div`
  display: grid;
  grid-template-columns: 10fr 1fr;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
`;

export default function PostCommentForm({ onSubmit }) {
  const [accessToken] = useLocalStorage('accessToken', '');
  const postCommentFormStore = usePostCommentFormStore();

  return (
    <Container>
      {accessToken ? (
        <Form onSubmit={onSubmit}>
          <ButtonBox>
            <Input
              height={50}
              width={1000}
              name="input-comment"
              type="text"
              value={postCommentFormStore.body || ''}
              onChange={(e) => postCommentFormStore.changeBody(e.target.value)}
              errorMessage={postCommentFormStore.errors.body}
              placeholder="댓글을 입력해 주세요"
            />
            <Button
              width={70}
              height={50}
              bgcolor="#5e677c"
              type="submit"
            >
              등록
            </Button>
          </ButtonBox>
        </Form>
      ) : (
        <Form onSubmit={onSubmit}>
          <Input
            label="댓글 달기"
            placeholder="로그인 해주세요"
          />
          <Button
            width={70}
            height={30}
            bgcolor="#5e677c"
            type="submit"
          >
            등록
          </Button>
        </Form>
      )}
    </Container>
  );
}
