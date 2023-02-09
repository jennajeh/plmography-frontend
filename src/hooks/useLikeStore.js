import { likeStore } from '../stores/LikeStore';
import useStore from './useStore';

export default function useLikeStore() {
  return useStore(likeStore);
}
