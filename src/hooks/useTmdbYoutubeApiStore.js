import { tmdbYoutubeApiStore } from '../stores/TmdbYoutubeApiStore';
import useStore from './useStore';

export default function useTmdbYoutubeApiStore() {
  return useStore(tmdbYoutubeApiStore);
}
