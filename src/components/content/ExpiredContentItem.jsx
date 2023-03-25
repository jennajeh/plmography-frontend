/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 0.6em;
  margin: 0 1em 8em 0;
  gap: 16px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: content;
  align-items: center;
  text-align: left;
  gap: 16px;

  img {
    display: inline-block;
    border-radius: 0.6em;
    width: 203px;
    height: 280px;
  }
`;

export default function ExpiredContentItem({ content }) {
  const {
    tmdbId, imageUrl, korTitle,
  } = content;

  return (
    <Container>
      <Link to={`/contents/${tmdbId}`}>
        <ImageBox>
          <img src={imageUrl} alt="img" />
          <h4>{korTitle}</h4>
        </ImageBox>
      </Link>
    </Container>
  );
}
