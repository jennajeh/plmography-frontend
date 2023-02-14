import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import RecommendTheme from '../components/theme/RecommendTheme';
import ThemeList from '../components/theme/ThemeList';
import useThemeStore from '../hooks/useThemeStore';

const Title = styled.h1`
  display: flex;
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 2em 0;
`;

export default function ThemesPage() {
  const themeStore = useThemeStore();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    themeStore.fetchHitThemes();
  }, []);

  useEffect(() => {
    themeStore.fetchThemes({ page, size: 8 });
  }, [page]);

  return (
    <>
      <Title>오늘 뭐 볼까?</Title>
      <RecommendTheme />
      <ThemeList />
    </>
  );
}
