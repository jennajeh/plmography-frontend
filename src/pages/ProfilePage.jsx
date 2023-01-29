import { useLocalStorage } from 'usehooks-ts';
import useContentStore from '../hooks/useContentStore';
import useUserStore from '../hooks/useUserStore';
import useReviewStore from '../hooks/useReviewStore';

export default function ProfilePage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const userStore = useUserStore();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();

  return (
    <div>ProfilePage</div>
  );
}
