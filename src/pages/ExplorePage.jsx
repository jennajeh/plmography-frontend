import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ContentsList from '../components/content-detail/ContentsList';
import ModalCategory from '../components/modal/ModalCategory';
import useContentStore from '../hooks/useContentStore';

const Container = styled.div`
  height: 100%;
`;

export default function ExplorePage() {
  const contentStore = useContentStore();

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    contentStore.fetchContents({ page, size: 8 });
  }, [page]);

  return (
    <Container>
      <ModalCategory />
      <ContentsList />
    </Container>
  );
}
