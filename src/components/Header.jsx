import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/Plmography-logo.jpeg';

const Container = styled.header`
background-color: black;
border-bottom: 1px solid #D9D9D9;
height: 4em;
`;

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
padding-inline: calc((100% - 900px) / 2);
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
  padding-right: 2.5em;

  :hover {
    margin-bottom: 10px;
  }
}
`;

const StyledLink = styled(Link)`
  color: white;

:hover {
  color: #ff006a;
  /* text-decoration: underline solid .2em; */
  /* text-underline-position: under; */
}
`;

const LogoBox = styled.div`
  width: 10em;

  img {
    width: 100%;
  }
`;

const SideMenu = styled.nav`
display: flex;
align-items: center;
`;

const LogoutButton = styled.button`
font-size: 1em;
font-weight: bold;
background: none;
border: none;
cursor: pointer;
`;

export default function Header() {
  const navigate = useNavigate();

  const accessToken = '';

  const handleClickLogout = () => {
    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <MainMenu>
          <List>
            <li>
              <StyledLink to="/">
                <LogoBox>
                  <img src={logo} alt="logo" />
                </LogoBox>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/recommendations">테마 추천</StyledLink>
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
                <LogoutButton type="button" onClick={handleClickLogout}>로그아웃</LogoutButton>
              </li>
              <li>
                <StyledLink to="/events">이벤트</StyledLink>
              </li>
              <li>
                <StyledLink to="/support">작품 제안</StyledLink>
              </li>
            </List>
          </SideMenu>
        ) : (
          <SideMenu>
            <List>
              <li>
                <StyledLink to="/login">로그인</StyledLink>
              </li>
              <li>
                <StyledLink to="/events">이벤트</StyledLink>
              </li>
              <li>
                <StyledLink to="/login">작품 제안</StyledLink>
              </li>
            </List>
          </SideMenu>
        )}
      </Wrapper>
    </Container>
  );
}
