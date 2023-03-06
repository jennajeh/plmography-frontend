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
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 1em 0 2em 0;
`;

const Tags = styled.ul`
  display: flex;
  align-items: center;
  
  span {
    color: ${((props) => props.theme.text.white)};
    font-size: 14px;
    font-weight: bold;
    margin: 1em;
  }

  li {
    margin-inline-end: 1rem;
  }
`;

const PlatformFilter = styled.button`
  border: none;
  margin-block: 1em;
  background-color: transparent;
  `;

const PlatformImage = styled.img`
  width: 4em;
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
  color: white;
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

  const handleFilterPlatforms = (platform) => {
    if (platform === filter.platform) {
      setFilter({ ...filter, platform: '' });

      return;
    }

    setFilter({ ...filter, platform });
  };

  useEffect(() => {
    contentStore.fetchThemeContents({
      themeId, page, size: 8, filter,
    });
  }, [page, filter]);

  if (!contents) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Main>
        <Title>{themes[0]?.title}</Title>
        <Tags>
          <span>플랫폼</span>
          {PLATFORMS.map((platform, idx) => (
            <li key={idx}>
              <PlatformFilter type="button" onClick={() => handleFilterPlatforms(platform.name)}>
                <PlatformImage
                  src={platform.image}
                  alt="platforms"
                />
              </PlatformFilter>
            </li>
          ))}
        </Tags>
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
