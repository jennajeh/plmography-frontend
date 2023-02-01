/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  >div{
    display: flex;
  }
`;

export default function ProfileSearchPage() {
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
        <SearchBar>
          <h1>검색하기</h1>
          <form onSubmit={handleSearchContents}>
            <label hidden htmlFor="input-search">컨텐츠 검색</label>
            <input name="search" placeholder="검색" id="input-search" type="text" />
            <button type="submit">검색</button>
          </form>
        </SearchBar>
        <SearchResultList />
      </Main>
    </Container>
  );
}
