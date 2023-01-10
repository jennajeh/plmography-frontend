import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContentDetail from '../components/content-detail/ContentDetail';
import useContentStore from '../hooks/useContentStore';

export default function ContentsDetailPage() {
  const contentStore = useContentStore();

  const { id } = useParams();

  useEffect(() => {
    contentStore.fetchContent(id);
  }, [id]);

  return (
    <ContentDetail />
  );
}
