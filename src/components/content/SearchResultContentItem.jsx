/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useContentStore from '../../hooks/useContentStore';
import useUserStore from '../../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1em;

h4 {
  margin: 1em 0;
  font-size: ${((props) => props.theme.size.h6)};
  color: ${((props) => props.theme.text.primary)};
}

  img {
    border-radius: 0.6em;
    width: 10em;
  }
`;

const Button = styled.button`
  width: 4em;
  height: 2em;
  border: none;
  border-radius: 0.3em;
  color: ${((props) => props.theme.text.white)};
  background-color: ${((props) => props.theme.text.sixthGrey)};

  :hover {
      color: ${((props) => props.theme.colors.first)};
  }
`;

export default function SearchResultContentItem({ content }) {
  const [accessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();
  const contentStore = useContentStore();
  const userStore = useUserStore();

  const {
    tmdbId, imageUrl, korTitle,
  } = content;
  const { user } = userStore;

  const { favoriteContentIds } = user;

  const favoriteId = favoriteContentIds?.find((data) => data === tmdbId);

  const handleClickFavorite = async (id) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    await contentStore.toggleFavorite(id);

    await userStore.fetchMe();
  };

  return (
    <Container>
      {favoriteId ? (
        <ImgWrapper>
          <img src={imageUrl} alt="img" />
          <h4>{korTitle}</h4>
        </ImgWrapper>
      ) : (
        <>
          <ImgWrapper>
            <img src={imageUrl} alt="img" />
            <h4>{korTitle}</h4>
          </ImgWrapper>
          <Button
            type="button"
            onClick={() => handleClickFavorite(tmdbId)}
          >
            등록
          </Button>
        </>
      )}
    </Container>
  );
}
