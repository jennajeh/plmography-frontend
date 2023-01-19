import { reviewFormStore } from '../stores/ReviewFormStore';
import useStore from './useStore';

export default function useReviewFormStore() {
  return useStore(reviewFormStore);
}
