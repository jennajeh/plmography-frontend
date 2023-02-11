import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import { PlmographyLogo } from '../../assets/common';
import { LogoutProfile } from '../../assets/profile';
import useUserStore from '../../hooks/useUserStore';

const Container = styled.header`
  background-color: ${((props) => props.theme.colors.background)};
  height: 78px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const MainMenu = styled.nav`
  display: flex;
  height: 100%;
`;

const List = styled.ul`
  display: flex;
  align-items: center;

li {
  font-weight: bold;
  padding-right: 40px;
}
`;

const StyledLink = styled(Link)`
  color: ${((props) => props.theme.colors.white)};
  font-size: 20px;

  :hover {
    color: ${((props) => props.theme.colors.first)}
  }

  img {
    width: 2em;
  }
`;

const StyledUserLink = styled(Link)`
  color: ${((props) => props.theme.colors.white)};
  font-size: 14px;

  :hover {
    color: ${((props) => props.theme.colors.first)}
  }

  img {
    width: 2em;
  }
`;

const LogoBox = styled.div`
  img {
    width: 154px;
    height: 25px;
  }
`;

const SideMenu = styled.nav`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  font-size: 14px;
  font-weight: bold;
  color: ${((props) => props.theme.text.white)};
  background: none;
  border: none;

  :hover {
    color: ${((props) => props.theme.colors.first)}
  }
`;

const TestButton = styled.button`
  font-size: 14px;
  font-weight: bold;
  color: ${((props) => props.theme.text.white)};
  background: none;
  border: 1px solid;
  border-radius: 10px;
  width: 80px;
  height: 30px;

  :hover {
    color: ${((props) => props.theme.colors.first)}
  }
`;

export default function Header() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const { user } = userStore;

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleClickLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  const handleClickTestLogin = async () => {
    const token = await userStore.login({ email: 'jenna@gmail.com', password: 'Test123!' });

    setAccessToken(token);

    navigate('/');
  };

  useEffect(() => {
    userStore.fetchMe();
  }, []);

  return (
    <Container>
      <Wrapper>
        <MainMenu>
          <List>
            <li>
              <StyledLink to="/">
                <LogoBox>
                  <img src={PlmographyLogo} alt="logo" />
                </LogoBox>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/themes">테마 추천</StyledLink>
            </li>
            <li>
              <StyledLink to="/community">커뮤니티</StyledLink>
            </li>
            <li>
              <StyledLink to="/explore">탐색</StyledLink>
            </li>
            <li>
              <StyledLink to="/new-contents">신작</StyledLink>
            </li>
          </List>
        </MainMenu>
        {accessToken ? (
          <SideMenu>
            <List>
              <li>
                <Button
                  type="button"
                  onClick={handleClickLogout}
                >
                  로그아웃
                </Button>
              </li>
              <li>
                <StyledUserLink to="/events">이벤트</StyledUserLink>
              </li>
              <li>
                <StyledUserLink to="/support">작품 제안</StyledUserLink>
              </li>
              <li>
                <StyledUserLink to="/profile">
                  <img
                    src={user.profileImage}
                    alt="profileImage"
                  />
                </StyledUserLink>
              </li>
            </List>
          </SideMenu>
        ) : (
          <SideMenu>
            <List>
              <li>
                <TestButton
                  type="button"
                  onClick={handleClickTestLogin}
                >
                  체험하기
                </TestButton>
              </li>
              <li>
                <StyledUserLink to="/login">로그인</StyledUserLink>
              </li>
              <li>
                <StyledUserLink to="/events">이벤트</StyledUserLink>
              </li>
              <li>
                <StyledUserLink to="/login">작품 제안</StyledUserLink>
              </li>
              <li>
                <StyledUserLink to="/">
                  <img
                    src={LogoutProfile}
                    alt="LogoutProfile"
                  />
                </StyledUserLink>
              </li>
            </List>
          </SideMenu>
        )}
      </Wrapper>
    </Container>
  );
}
