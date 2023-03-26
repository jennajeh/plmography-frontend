/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import MyFavoriteList from '../components/profile/MyFavoriteList';
import useContentStore from '../hooks/useContentStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 1em 0;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 600;
  margin: 30px 0;
  color: ${((props) => props.theme.text.white)};
`;

const MyPage = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  text-align: center;
  margin-bottom: 1em;
`;

const MyPageButton = styled.button`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 6.5em;
  height: 3em;
  border: none;
  border-radius: 0.3em;
  color: ${((props) => props.theme.text.white)};
  background-color: ${((props) => props.theme.text.sixthGrey)};
`;

const Main = styled.div`
  width: 100%;
  padding-inline: 2rem;
`;

export default function MyProfileFavoritesPage() {
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage('accessToken', '');
  const contentStore = useContentStore();
  const userStore = useUserStore();

  const { user } = userStore;

  const { id: userId, favoriteContentIds } = user;
  const favoriteContentId = favoriteContentIds?.join(',');

  const handleClickMyProfile = async () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    navigate('/profile');
  };

  useEffect(() => {
    userStore.fetchMe();
    userStore.fetchUsers();
  }, []);

  useEffect(() => {
    if (userId && favoriteContentId) {
      contentStore.fetchFavoriteContents({ userId, favoriteContentId });
    }
  }, [userId, favoriteContentId]);

  return (
    <Container>
      <Header>
        <Title>나의 인생 작품</Title>
      </Header>
      <MyPage>
        <MyPageButton type="button" onClick={handleClickMyProfile}>
          마이 페이지 바로가기
        </MyPageButton>
      </MyPage>
      <Main>
        <MyFavoriteList />
      </Main>
    </Container>
  );
}
