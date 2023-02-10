import styled from 'styled-components';
import { bannerImage } from '../../assets/contents';

const Container = styled.article`
  margin: 100px 0 120px 0;
`;

const ImageWrapper = styled.div`
  img {
    width: 100%;
    height: 230px;
  }
`;

export default function HomeBanner() {
  return (
    <Container>
      <ImageWrapper>
        <img src={bannerImage} alt="bannerImage" />
      </ImageWrapper>
    </Container>
  );
}
