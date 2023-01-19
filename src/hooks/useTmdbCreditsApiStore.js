import { tmdbCreditsApiStore } from '../stores/TmdbCreditsApiStore';
import useStore from './useStore';

export default function useTmdbCreditsApiStore() {
  return useStore(tmdbCreditsApiStore);
}
