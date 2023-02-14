/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import usePostStore from '../../hooks/usePostStore';
import Input from '../common/Input';
import PostList from './PostList';
import Button from '../common/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  color: ${((props) => props.theme.text.white)};
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1rem;

  div{
    display: flex;
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 15px;
  align-items: center;
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
    postStore.fetchPosts({ page, size: 5, filter });
  }, [page, filter]);

  return (
    <Container>
      <SearchBar>
        <SearchForm onSubmit={handleSearchPosts}>
          <label hidden htmlFor="input-search">커뮤니티 검색</label>
          <Input
            width={200}
            height={40}
            name="search"
            placeholder="제목 혹은 내용을 입력하세요"
            id="input-search"
            type="text"
          />
          <Button
            width={80}
            height={30}
            bgcolor="#afbaca"
            type="submit"
          >
            검색
          </Button>
        </SearchForm>
      </SearchBar>
      <PostList />
    </Container>
  );
}
