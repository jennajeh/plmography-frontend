import { postCommentStore } from '../stores/PostCommentStore';
import useStore from './useStore';

export default function usePostCommentStore() {
  return useStore(postCommentStore);
}
