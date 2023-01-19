import { commentFormStore } from '../stores/CommentFormStore';
import useStore from './useStore';

export default function useCommentFormStore() {
  return useStore(commentFormStore);
}
