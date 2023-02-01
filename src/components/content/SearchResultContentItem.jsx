/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useContentStore from '../../hooks/useContentStore';

const ImgWrapper = styled.article`
  margin: 1em 0 1em 0;

h4 {
  text-align: center;
  font-size: ${((props) => props.theme.size.h6)};
  color: ${((props) => props.theme.text.primary)};
}

  img {
    border-radius: 0.6em;
    width: 10em;
  }
`;

const Button = styled.button`
  width: 5em;
  height: 5em;
`;

export default function SearchResultContentItem({ item }) {
  const [accessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();
  const contentStore = useContentStore();

  const {
    tmdbId, imageUrl, korTitle,
  } = item;

  const handleClickFavorite = async (id) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    await contentStore.toggleFavorite(id);
  };

  return (
    <>
      <ImgWrapper>
        <img src={imageUrl} alt="img" />
        <h4>{korTitle}</h4>
      </ImgWrapper>
      <Button type="button" onClick={() => handleClickFavorite(tmdbId)}>
        등록하기
      </Button>
    </>
  );
}
