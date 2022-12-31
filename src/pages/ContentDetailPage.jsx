import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useContentStore from '../hooks/useContentStore';
import ContentDetail from '../components/ContentDetail';

export default function ContentsDetailPage() {
  const contentStore = useContentStore();

  const { id } = useParams();

  const fetchData = async () => {
    await contentStore.fetchContent(id);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const { content } = contentStore;

  if (!content) {
    <p>content 불러오는중...</p>;
  }

  return (
    <ContentDetail
      content={content}
    />
  );
}
