import { postStore } from '../stores/PostStore';
import useStore from './useStore';

export default function usePostStore() {
  return useStore(postStore);
}
