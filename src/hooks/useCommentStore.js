import { commentStore } from '../stores/CommentStore';
import useStore from './useStore';

export default function useCommentStore() {
  return useStore(commentStore);
}
