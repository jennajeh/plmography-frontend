/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.article`
  margin-block: 1em;
`;

const ImgWrapper = styled.article`
  h4 {
    text-align: center;
    color: ${((props) => props.theme.text.white)};
    margin-top: 1em;
  }

  img {
    border-radius: 0.6em;
    width: 100%;
  }
`;

export default function AllExpiredContentItems({ content }) {
  const {
    tmdbId, imageUrl, korTitle,
  } = content;

  return (
    <Container>
      <Link to={`/contents/${tmdbId}`}>
        <ImgWrapper>
          <img src={imageUrl} alt="img" />
          <h4>{korTitle}</h4>
        </ImgWrapper>
      </Link>
    </Container>
  );
}
