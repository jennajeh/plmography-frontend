import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ContentsList from '../components/content/ContentsList';
import Category from '../components/modal/Category';
import useContentStore from '../hooks/useContentStore';

const Container = styled.div`
  min-height: calc(100vh - env(safe-area-inset-bottom) - 56px);
  max-width: 70em;
  margin: 0 auto;
  padding-bottom: calc(env(safe-area-inset-bottom) + 56px);
  overflow: hidden;
`;

export default function ExplorePage() {
  return (
    <Container>
      <Category />
      {/* <ContentsList /> */}
    </Container>
  );
}
