import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  padding: 3em 3em 0 3em;
  p {
    font-size: 1.3em;
    font-weight: bold;
    color: #8F8272;
  }
`;

export default function KakaoLoginRedirectPage() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();
  const userStore = useUserStore();

  const authorizationCode = new URL(window.location.href).searchParams.get('code');

  async function getLoginResult() {
    const accessToken = await userStore.sendKakaoAuthorizationCode(authorizationCode);

    setAccessToken(accessToken);

    navigate('/');
  }

  useEffect(() => {
    getLoginResult();
  }, []);

  return (
    <Container>
      <p>Please wait...</p>
    </Container>
  );
}
