import { postCommentEditFormStore } from '../stores/PostCommentEditFormStore';
import useStore from './useStore';

export default function usePostCommentEditFormStore() {
  return useStore(postCommentEditFormStore);
}
