import { postFormStore } from '../stores/PostFormStore';
import useStore from './useStore';

export default function usePostFormStore() {
  return useStore(postFormStore);
}
