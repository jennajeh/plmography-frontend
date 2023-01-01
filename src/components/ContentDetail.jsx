/* eslint-disable react/prop-types */
import styled from 'styled-components';
import useContentStore from '../hooks/useContentStore';
import ContentDetailHeader from './ContentDetailHeader';
import ContentDetailInformation from './ContentDetailInformation';
import ContentDetailPlatform from './ContentDetailPlatform';
import ContentDetailReviews from './ContentDetailReviews';

const Container = styled.article`
  height: 100%;
`;

export default function ContentDetail() {
  const contentStore = useContentStore();

  const { content } = contentStore;

  if (!content) {
    <p>Loading...</p>;
  }

  return (
    <Container>
      <ContentDetailHeader />
      <ContentDetailPlatform />
      <ContentDetailInformation />
      <ContentDetailReviews />
    </Container>
  );
}
