import { reviewCommentStore } from '../stores/ReviewCommentStore';
import useStore from './useStore';

export default function useReviewCommentStore() {
  return useStore(reviewCommentStore);
}
