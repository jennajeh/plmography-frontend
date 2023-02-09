import { postCommentFormStore } from '../stores/PostCommentFormStore';
import useStore from './useStore';

export default function usePostCommentFormStore() {
  return useStore(postCommentFormStore);
}
