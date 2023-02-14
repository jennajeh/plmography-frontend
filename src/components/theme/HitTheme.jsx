/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ImgWrapper = styled.article`
  margin-bottom: 4em;

  h4 {
    text-align: center;
    font-size: 1.1em;
    font-weight: 600;
    color: ${((props) => props.theme.text.white)};
  }

  img {
    border-radius: 0.6em;
    margin-bottom: 1em;
    width: 16em;
    height: 10em;
  }
`;

export default function HitTheme({ hitTheme }) {
  const { id: themeId, title, image } = hitTheme;

  return (
    <div>
      <Link to={`/themes/${themeId}`}>
        <ImgWrapper>
          <img src={image} alt="img" />
          <h4>{title}</h4>
        </ImgWrapper>
      </Link>
    </div>
  );
}
