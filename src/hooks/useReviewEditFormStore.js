import { reviewEditFormStore } from '../stores/ReviewEditFormStore';
import useStore from './useStore';

export default function useReviewEditFormStore() {
  return useStore(reviewEditFormStore);
}
