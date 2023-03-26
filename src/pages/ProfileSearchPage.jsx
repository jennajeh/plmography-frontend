/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import SearchResultList from '../components/content/SearchResultList';
import useContentStore from '../hooks/useContentStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  padding: 2rem;
  `;

const Main = styled.div`
  width: 100%;
  padding-inline: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  >div{
    display: flex;
  }

  input {
    width: 20em;
    height: 2em;
    border: none;
    border-radius: 0.3em;
    margin-right: 1em;
  }

  button {
    width: 4em;
    height: 2em;
    border: none;
    border-radius: 0.3em;
    color: ${((props) => props.theme.text.white)};
    background-color: ${((props) => props.theme.text.sixthGrey)};
  }
`;

const MyPageButton = styled.button`
  width: 6.5em;
  height: 3em;
  border: none;
  border-radius: 0.3em;
  color: ${((props) => props.theme.text.white)};
  background-color: ${((props) => props.theme.text.sixthGrey)};
`;

export default function ProfileSearchPage() {
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage('accessToken', '');
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState({});
  const contentStore = useContentStore();
  const userStore = useUserStore();
  const page = searchParams.get('page') ?? 1;

  const { user } = userStore;
  const {
    id: userId, favoriteContentIds, watchedContentIds, wishContentIds,
  } = user;
  const favoriteContentId = favoriteContentIds?.join(',');
  const watchedContentId = watchedContentIds?.join(',');
  const wishContentId = wishContentIds?.join(',');

  const handleClickMyProfile = async () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    navigate('/profile');
  };

  const handleSearchContents = (e) => {
    e.preventDefault();

    const searchTitle = e.target.search.value;

    setFilter({ searchTitle });
  };

  if (!accessToken || !userStore.user) {
    return (
      <Container>
        <p>
          잘못된 접근입니다.
        </p>
      </Container>
    );
  }

  useEffect(() => {
    userStore.fetchMe();
    userStore.fetchUsers();
  }, []);

  useEffect(() => {
    contentStore.fetchContents({ page, size: 8, filter });
  }, [page, filter]);

  useEffect(() => {
    if (userId && favoriteContentId) {
      contentStore.fetchFavoriteContents({ userId, favoriteContentId });
    }
  }, [userId, favoriteContentId]);

  useEffect(() => {
    if (userId && watchedContentId) {
      contentStore.fetchWatchedContents({ userId, watchedContentId });
    }
  }, [userId, watchedContentId]);

  useEffect(() => {
    if (userId && wishContentId) {
      contentStore.fetchWishContents({ userId, wishContentId });
    }
  }, [userId, wishContentId]);

  return (
    <Container>
      <Main>
        <Header>
          <MyPageButton type="button" onClick={handleClickMyProfile}>
            마이 페이지 바로가기
          </MyPageButton>
          <SearchBar>
            <form onSubmit={handleSearchContents}>
              <label
                hidden
                htmlFor="input-search"
              >
                컨텐츠 검색
              </label>
              <input
                name="search"
                placeholder="작품명을 입력하세요"
                id="input-search"
                type="text"
              />
              <button type="submit">검색</button>
            </form>
          </SearchBar>
        </Header>
        <SearchResultList />
      </Main>
    </Container>
  );
}
