/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import ContentDetailHeader from './ContentDetailHeader';
import ContentDetailInformation from './ContentDetailInformation';
import ContentDetailPlatform from './ContentDetailPlatform';
import ContentDetailArticle from './ContentDetailArticle';
import ContentDetailReviews from './ContentDetailReviews';
import ContentDetailCollection from './ContentDetailCollection';

const Container = styled.article`
  height: 100%;
`;

export default function ContentDetail() {
  const contentStore = useContentStore();

  const { content } = contentStore;

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <ContentDetailHeader />
      <ContentDetailPlatform />
      <ContentDetailInformation />
      <ContentDetailReviews />
      <ContentDetailArticle />
      <ContentDetailCollection />
    </Container>
  );
}
