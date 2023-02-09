import { postEditFormStore } from '../stores/PostEditFormStore';
import useStore from './useStore';

export default function usePostEditFormStore() {
  return useStore(postEditFormStore);
}
