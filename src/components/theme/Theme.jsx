/* eslint-disable react/prop-types */

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useThemeStore from '../../hooks/useThemeStore';

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

export default function Theme({ theme }) {
  const navigate = useNavigate();
  const themeStore = useThemeStore();

  const { id: themeId, title, image } = theme;

  const handleClickUpdateHit = () => {
    themeStore.updateHit(themeId);

    navigate(`/themes/${themeId}`);
  };

  return (
    <div>
      <button type="button" onClick={handleClickUpdateHit}>
        <ImgWrapper>
          <img src={image} alt="img" />
          <h4>{title}</h4>
        </ImgWrapper>
      </button>
      {/* <Link to={`/themes/${themeId}`}>
        <ImgWrapper>
          <img src={image} alt="img" />
          <h4>{title}</h4>
        </ImgWrapper>
      </Link> */}
    </div>
  );
}
