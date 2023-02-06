/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import GENRES from '../../constants/genres';
import PLATFORMS from '../../constants/platforms';
import RELEASEDATES from '../../constants/releaseDates';
import TYPES from '../../constants/types';
import useContentStore from '../../hooks/useContentStore';
import ContentsList from './ContentsList';

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

const TypeFilter = styled.button`
border: none;
padding: .5rem 1rem;
border-radius: 2rem;
background: #e4e4e4;
`;

const DateFilter = styled.button`
border: none;
padding: .5rem 1rem;
border-radius: 2rem;
background: #e4e4e4;
`;

const GenreFilter = styled.button`
  border: none;
  padding: .5rem 1rem;
  border-radius: 2rem;
  background: #9be2e2;
`;

const RefreshButton = styled.button`
  display: block;
  background: none;
  border: 1px solid #d5dbe2;
  border-radius: 50%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1em;
  margin: 0 1em 1em;
`;

export default function Category() {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState({});
  const contentStore = useContentStore();
  const page = searchParams.get('page') ?? 1;

  const handleSearchContents = (e) => {
    e.preventDefault();

    const searchTitle = e.target.search.value;

    setFilter({ searchTitle });
  };

  const handleFilterPlatforms = (platform) => {
    if (platform === filter.platform) {
      setFilter({ ...filter, platform: '' });

      return;
    }

    setFilter({ ...filter, platform });
  };

  const handleFilterTypes = (type) => {
    if (type === filter.type) {
      setFilter({ ...filter, type: '' });

      return;
    }

    setFilter({ ...filter, type });
  };

  const handleFilterGenres = (genre) => {
    if (genre === filter.genre) {
      setFilter({ ...filter, genre: '' });

      return;
    }

    setFilter({ ...filter, genre });
  };

  const handleFilterReleaseDate = (date) => {
    if (date === filter.date) {
      setFilter({ ...filter, date: '' });

      return;
    }

    setFilter({ ...filter, date });
  };

  const handleRefreshFilter = () => {
    setFilter({});
  };

  const handleClickLatest = () => {
    setFilter({ ...filter, sort: 'releaseDate' });
  };

  const handleClickPopular = () => {
    setFilter({ ...filter, sort: 'popularity' });
  };

  const handleClickName = () => {
    setFilter({ ...filter, sort: 'korTitle' });
  };
  console.log(filter);

  useEffect(() => {
    contentStore.fetchContents({ page, size: 8, filter });
  }, [page, filter]);

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
        <Tags>
          <h3>영화/TV</h3>
          {TYPES.sections.map((section, idx) => (
            <li key={idx}>
              <TypeFilter type="button" onClick={() => handleFilterTypes(section.code)}>
                {section.name}
              </TypeFilter>
            </li>
          ))}
        </Tags>
        <Tags>
          <h3>장르</h3>
          {GENRES.sections.map((section, idx) => (
            <li key={idx}>
              <GenreFilter type="button" onClick={() => handleFilterGenres(section.code)}>
                {section.name}
              </GenreFilter>
            </li>
          ))}
        </Tags>
        <Tags>
          <h3>개봉연도</h3>
          {RELEASEDATES.sections.map((section, idx) => (
            <li key={idx}>
              <DateFilter type="button" onClick={() => handleFilterReleaseDate(section.year)}>
                {section.name}
              </DateFilter>
            </li>
          ))}
        </Tags>
        <RefreshButton type="button" onClick={handleRefreshFilter}>
          초기화
        </RefreshButton>
        <Buttons>
          <button type="button" onClick={handleClickLatest}>
            최신순
          </button>
          <button type="button" onClick={handleClickPopular}>
            인기순
          </button>
          <button type="button" onClick={handleClickName}>
            이름순
          </button>
        </Buttons>
        <ContentsList />
      </Main>
    </Container>
  );
}
