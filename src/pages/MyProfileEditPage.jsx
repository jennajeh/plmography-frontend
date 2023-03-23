import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import ProfileEditForm from '../components/profile/ProfileEditForm';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 50em;
`;

export default function MyProfileEditPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchMe();
  }, []);

  if (!accessToken) {
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
      <ProfileEditForm />
    </Container>
  );
}
