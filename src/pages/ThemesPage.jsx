import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import RecommendTheme from '../components/theme/RecommendTheme';
import ThemeList from '../components/theme/ThemeList';
import useThemeStore from '../hooks/useThemeStore';

const Container = styled.div`
  min-height: calc(100vh - env(safe-area-inset-bottom) - 56px);
  max-width: 70em;
  margin: 0 auto;
  padding-bottom: calc(env(safe-area-inset-bottom) + 56px);
  overflow: hidden;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-size: ${((props) => props.theme.size.h4)};
  font-weight: bold;
  margin-top: 1em;
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
    <Container>
      <Title>오늘 뭐 볼까? 👀</Title>
      <RecommendTheme />
      <ThemeList />
    </Container>
  );
}
