import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import usePostStore from '../hooks/usePostStore';
import PostEditForm from '../components/community/PostEditForm';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 50em;
`;

export default function PostEditPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const userStore = useUserStore();
  const postStore = usePostStore();
  const { id } = useParams();

  const { user } = userStore;

  useEffect(() => {
    postStore.fetchPost(id);
    userStore.fetchMe();
  }, []);

  if (!accessToken || !postStore.isMyPost(user.id)) {
    return (
      <Container>
        <p>
          잘못된 접근입니다.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <PostEditForm />
    </Container>
  );
}
