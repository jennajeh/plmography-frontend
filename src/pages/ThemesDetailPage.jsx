import { useEffect } from 'react';
import styled from 'styled-components';
import ThemeContentList from '../components/theme/ThemeContentList';
import useThemeStore from '../hooks/useThemeStore';

const Container = styled.div`
  min-height: calc(100vh - env(safe-area-inset-bottom) - 56px);
  max-width: 70em;
  margin: 0 auto;
  padding-bottom: calc(env(safe-area-inset-bottom) + 56px);
  overflow: hidden;
`;

export default function ThemesDetailPage() {
  const themeStore = useThemeStore();

  useEffect(() => {
    themeStore.fetchHitThemes();
  }, []);

  return (
    <Container>
      <ThemeContentList />
    </Container>
  );
}
