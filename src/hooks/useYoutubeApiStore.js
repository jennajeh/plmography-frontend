import { youtubeApiStore } from '../stores/YoutubeApiStore';
import useStore from './useStore';

export default function useYoutubeApiStore() {
  return useStore(youtubeApiStore);
}
