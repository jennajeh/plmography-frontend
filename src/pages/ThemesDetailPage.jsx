import { useEffect } from 'react';
import ThemeContentList from '../components/theme/ThemeContentList';
import useThemeStore from '../hooks/useThemeStore';

export default function ThemesDetailPage() {
  const themeStore = useThemeStore();

  useEffect(() => {
    themeStore.fetchHitThemes();
  }, []);

  return (
    <ThemeContentList />
  );
}
