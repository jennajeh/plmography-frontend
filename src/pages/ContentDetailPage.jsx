import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useContentStore from '../hooks/useContentStore';
import ContentDetail from '../components/ContentDetail';

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
