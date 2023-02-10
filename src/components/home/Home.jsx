/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components';
import HomeDailyRanking from './HomeDailyRanking';
import HomeExpireContents from './HomeExpireContents';
import SortedArticleList from '../articles/SortedArticleList';
import HomeCommunity from './HomeCommunity';
import HomeBanner from './HomeBanner';

const Container = styled.article`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function Home() {
  return (
    <Container>
      <HomeBanner />
      <Wrapper>
        <HomeDailyRanking />
        <HomeCommunity />
      </Wrapper>
      <HomeExpireContents />
      <SortedArticleList />
    </Container>
  );
}
