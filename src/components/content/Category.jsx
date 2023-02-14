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
import Button from '../common/Button';
import Input from '../common/Input';
import ContentsList from './ContentsList';

const Container = styled.div`
  display: flex;
  padding: 2rem;
  `;

const Main = styled.div`
  width: 100%;
  padding-inline: 2rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-block: 1em;
`;

const MainTitle = styled.h1`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 1em 0;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;

  input {
    width: 20em;
    height: 2.5em;
  }
`;

const Tags = styled.ul`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  align-items: center;

  li {
    padding: 0.5em;
  }

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 1em;
  font-weight: 600;
  margin: 20px;
  color: ${((props) => props.theme.text.white)};
`;

const PlatformFilter = styled.button`
  border: none;
  background-color: transparent;
`;

const PlatformImage = styled.img`
  width: ${((props) => (props.selected ? '5em' : '4em'))};
`;

const TypeFilter = styled.button`
  border: none;
  width: 7em;
  height: 2.5em;
  border-radius: 2rem;
  background-color: ${((props) => (props.selected ? props.theme.colors.first : props.theme.colors.third))};
  color: ${((props) => props.theme.text.white)};
`;

const DateFilter = styled.button`
  border: none;
  width: 7em;
  height: 2.5em;
  border-radius: 2rem;
  background-color: ${((props) => (props.selected ? props.theme.colors.first : props.theme.colors.third))};
  color: ${((props) => props.theme.text.white)};
`;

const GenreFilter = styled.button`
  border: none;
  padding: 6px;
  width: 7em;
  height: 2.5em;
  border-radius: 2rem;
  background-color: ${((props) => (props.selected ? props.theme.colors.first : props.theme.colors.third))};
  color: ${((props) => props.theme.text.white)};
`;

const ButtonBox = styled.div`
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

  useEffect(() => {
    contentStore.fetchContents({ page, size: 8, filter });
  }, [page, filter]);

  if (!PLATFORMS || !TYPES || !GENRES || !RELEASEDATES) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <Container>
      <Main>
        <MainTitle>탐색 하기</MainTitle>
        <InputBox>
          <SearchForm onSubmit={handleSearchContents}>
            <label hidden htmlFor="input-search">컨텐츠 검색</label>
            <Input
              name="search"
              placeholder="검색"
              id="input-search"
              type="text"
            />
            <Button
              width={70}
              height={30}
              bgcolor="#5e677c"
              type="submit"
            >
              검색
            </Button>
          </SearchForm>
        </InputBox>
        <Tags>
          <Title>플랫폼</Title>
          {PLATFORMS.map((platform, idx) => (
            <li key={idx}>
              <PlatformFilter
                type="button"
                onClick={() => handleFilterPlatforms(platform.name)}
              >
                <PlatformImage
                  selected={filter.platform === platform.name}
                  src={platform.image}
                  alt="platforms"
                />
              </PlatformFilter>
            </li>
          ))}
        </Tags>
        <Tags>
          <Title>영화/TV</Title>
          {TYPES.sections.map((section, idx) => (
            <li key={idx}>
              <TypeFilter
                selected={filter.type === section.code}
                type="button"
                onClick={() => handleFilterTypes(section.code, idx)}
              >
                {section.name}
              </TypeFilter>
            </li>
          ))}
        </Tags>
        <Tags>
          <Title>장르</Title>
          {GENRES.sections.map((section, idx) => (
            <li key={idx}>
              <GenreFilter
                selected={filter.genre === section.code}
                type="button"
                onClick={() => handleFilterGenres(section.code)}
              >
                {section.name}
              </GenreFilter>
            </li>
          ))}
        </Tags>
        <Tags>
          <Title>개봉연도</Title>
          {RELEASEDATES.sections.map((section, idx) => (
            <li key={idx}>
              <DateFilter
                selected={filter.date === section.year}
                type="button"
                onClick={() => handleFilterReleaseDate(section.year)}
              >
                {section.name}
              </DateFilter>
            </li>
          ))}
        </Tags>
        <ButtonBox>
          <Button
            width={70}
            height={30}
            bgcolor="#5e677c"
            type="button"
            onClick={handleRefreshFilter}
          >
            초기화
          </Button>
          <Button
            width={70}
            height={30}
            bgcolor="#5e677c"
            type="button"
            onClick={handleClickLatest}
          >
            최신순
          </Button>
          <Button
            width={70}
            height={30}
            bgcolor="#5e677c"
            type="button"
            onClick={handleClickPopular}
          >
            인기순
          </Button>
          <Button
            width={70}
            height={30}
            bgcolor="#5e677c"
            type="button"
            onClick={handleClickName}
          >
            이름순
          </Button>
        </ButtonBox>
        <ContentsList />
      </Main>
    </Container>
  );
}
