import { articleStore } from '../stores/ArticleStore';
import useStore from './useStore';

export default function useArticleStore() {
  return useStore(articleStore);
}
