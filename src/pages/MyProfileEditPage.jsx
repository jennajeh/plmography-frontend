import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import ProfileEditForm from '../components/profile/ProfileEditForm';
import useUserStore from '../hooks/useUserStore';
import useProfileEditFormStore from '../hooks/useProfileEditFormStore';

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
  const profileEditFormStore = useProfileEditFormStore();

  const loadData = async () => {
    await userStore.fetchMe();
    profileEditFormStore.reset();
    profileEditFormStore.fillFields(userStore.user);
  };

  useEffect(() => {
    loadData();
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
