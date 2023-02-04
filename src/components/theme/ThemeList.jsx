import useThemeStore from '../../hooks/useThemeStore';

export default function ThemeList() {
  const themeStore = useThemeStore();

  const { themes } = themeStore;
  return (
    <div>ThemeList</div>
  );
}
