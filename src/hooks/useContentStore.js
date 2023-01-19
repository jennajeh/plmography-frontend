import { contentStore } from '../stores/ContentStore';
import useStore from './useStore';

export default function useContentStore() {
  return useStore(contentStore);
}
