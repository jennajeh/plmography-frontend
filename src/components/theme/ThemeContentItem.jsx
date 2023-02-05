/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ImgWrapper = styled.article`
  margin: 1em 0 1em 0;

h4 {
  text-align: center;
  font-size: ${((props) => props.theme.size.h6)};
  color: ${((props) => props.theme.text.primary)};
}

  img {
    border-radius: 0.6em;
    width: 100%;
  }
`;

export default function ThemeContentItem({ content }) {
  const { tmdbId, korTitle, imageUrl } = content;

  return (
    <Link to={`/contents/${tmdbId}`}>
      <ImgWrapper>
        <img src={imageUrl} alt="img" />
        <h4>{korTitle}</h4>
      </ImgWrapper>
    </Link>
  );
}
