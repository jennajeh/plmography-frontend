import { reviewStore } from '../stores/ReviewStore';
import useStore from './useStore';

export default function useReviewStore() {
  return useStore(reviewStore);
}
