import { themeStore } from '../stores/ThemeStore';
import useStore from './useStore';

export default function useContentStore() {
  return useStore(themeStore);
}
