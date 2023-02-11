/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import usePostStore from '../../hooks/usePostStore';
import PostList from './PostList';

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

export default function Posts() {
  const [filter, setFilter] = useState({});
  const postStore = usePostStore();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  const handleSearchPosts = (e) => {
    e.preventDefault();

    const keyword = e.target.search.value;

    setFilter({ keyword });
  };

  useEffect(() => {
    postStore.fetchPosts({ page, size: 10, filter });
  }, [page, filter]);

  return (
    <Container>
      <Main>
        <SearchBar>
          <form onSubmit={handleSearchPosts}>
            <label hidden htmlFor="input-search">커뮤니티 검색</label>
            <input
              name="search"
              placeholder="제목 혹은 내용을 입력하세요"
              id="input-search"
              type="text"
            />
            <button type="submit">검색</button>
          </form>
        </SearchBar>
        <PostList />
      </Main>
    </Container>
  );
}
