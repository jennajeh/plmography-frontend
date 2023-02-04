/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import PLATFORMS from '../../constants/platforms';
import useContentStore from '../../hooks/useContentStore';
import useThemeStore from '../../hooks/useThemeStore';
import Pagination from '../page/Pagination';
import ThemeContentItem from './ThemeContentItem';

const Container = styled.div`
  display: flex;
  padding: 2rem;
  `;

const Main = styled.div`
  width: 100%;
  padding-inline: 2rem;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-size: ${((props) => props.theme.size.h4)};
  font-weight: bold;
  margin-top: 1em;
`;

const Tags = styled.ul`
  display: flex;
  align-items: center;
  li{
    margin-inline-end: 1rem;
  }
`;

const PlatformFilter = styled.button`
  border: none;
  padding: .5rem 1rem;

  img {
    width: 5em;
  }
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1em;
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  text-align: center;
`;

const RefreshButton = styled.button`
  display: block;
  background: none;
  border: 1px solid #d5dbe2;
  border-radius: 50%;
`;

export default function ThemeContentList() {
  const contentStore = useContentStore();
  const themeStore = useThemeStore();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState({});

  const { contents } = contentStore;
  const page = searchParams.get('page') ?? 1;
  const themeId = location.pathname?.split('/')[2];
  const themes = themeStore.getThemesTitle(Number(themeId));

  console.log(contents);

  const handleFilterPlatforms = (platform) => {
    if (platform === filter.platform) {
      setFilter({ ...filter, platform: '' });

      return;
    }

    setFilter({ ...filter, platform });
  };

  const handleRefreshFilter = () => {
    setFilter({});
  };

  useEffect(() => {
    contentStore.fetchThemeContents({
      themeId, page, size: 8, filter,
    });
  }, [page, filter]);

  if (!contents) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <Container>
      <Main>
        <Title>{themes[0]?.title}</Title>
        <Tags>
          <h3>플랫폼</h3>
          {PLATFORMS.sections.map((section, idx) => (
            <li key={idx}>
              <PlatformFilter type="button" onClick={() => handleFilterPlatforms(section.code)}>
                <img
                  src={section.image}
                  alt="platforms"
                />
              </PlatformFilter>
            </li>
          ))}
        </Tags>
        <RefreshButton type="button" onClick={handleRefreshFilter}>
          초기화
        </RefreshButton>
        {contents.length ? (
          <>
            <List>
              {contents.map((content) => (
                <ThemeContentItem
                  key={content.id}
                  content={content}
                />
              ))}
            </List>
            <Pagination
              url={location.pathname}
              total={contentStore.totalPages}
              current={searchParams.get('page') ?? 1}
            />
          </>
        ) : (
          <Error>작품이 존재하지 않습니다.</Error>
        )}
      </Main>
    </Container>
  );
}
