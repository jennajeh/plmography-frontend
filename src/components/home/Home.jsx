/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeDailyRanking from './HomeDailyRanking';
import ArticleList from '../articles/ArticleList';
import HomeExpireContents from './HomeExpireContents';

const Container = styled.article`
  display: flex;
  flex-direction: column;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;

  div {
    display: flex;
  }
`;

export default function Home() {
  const navigate = useNavigate();

  const handleSearchContents = () => {
    navigate('/explore');
  };

  return (
    <Container>
      <SearchBar>
        <h1>검색</h1>
        <label hidden htmlFor="input-search">컨텐츠 검색</label>
        <input
          name="search"
          placeholder="🔎 원하는 작품을 검색해 보세요"
          type="text"
          onClick={handleSearchContents}
        />
      </SearchBar>
      <HomeDailyRanking />
      {/* <HomeCommunity /> */}
      <HomeExpireContents />
      <ArticleList />
    </Container>
  );
}
