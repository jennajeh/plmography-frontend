import { subscribeStore } from '../stores/SubscribeStore';
import useStore from './useStore';

export default function useSubscribeStore() {
  return useStore(subscribeStore);
}
