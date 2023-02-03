import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useContentStore from '../hooks/useContentStore';
import useThemeStore from '../hooks/useThemeStore';

export default function ThemesPage() {
  const contentStore = useContentStore();
  const themeStore = useThemeStore();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    themeStore.fetchHitThemes();
  }, []);

  useEffect(() => {
    themeStore.fetchThemes({ page, size: 5 });
  }, [page]);

  // useEffect(() => {
  //   contentStore.fetchThemeContents(themeId);
  // }, [themeId]);

  return (
    <div>ThemesPage</div>
  );
}
