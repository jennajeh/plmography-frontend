import { reviewCommentFormStore } from '../stores/ReviewCommentFormStore';
import useStore from './useStore';

export default function useReviewCommentFormStore() {
  return useStore(reviewCommentFormStore);
}
