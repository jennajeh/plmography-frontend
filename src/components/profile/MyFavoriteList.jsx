import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import useUserStore from '../../hooks/useUserStore';

const Container = styled.div`
  color: white;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1em;
`;

const FavoriteContent = styled.div`
  display: flex;
  margin: 0 1.2em;
  justify-content: center;
  align-items: center;
  
  img {
    width: 8em;
  }
`;

const DeleteButton = styled.button`
  width: 4em;
  height: 2em;
  margin: 1em 0;
  border: none;
  border-radius: 0.3em;
  color: ${((props) => props.theme.text.white)};
  background-color: ${((props) => props.theme.text.sixthGrey)};

  :hover {
    color: ${((props) => props.theme.colors.first)};
  }
`;

export default function MyFavoriteList() {
  const contentStore = useContentStore();
  const userStore = useUserStore();

  const { favoriteContents } = contentStore;
  const { user } = userStore;

  const { id: userId, favoriteContentIds } = user;

  const favoriteContentId = favoriteContentIds?.join(',');

  const handleClickFavorite = async (id) => {
    await contentStore.toggleFavorite(id);

    await contentStore.fetchFavoriteContents({ userId, favoriteContentId });

    await userStore.fetchMe();
  };

  return (
    <Container>
      {favoriteContentIds?.length && (
        <List>
          {favoriteContents.map((content) => (
            <li key={content.id}>
              {content.userId === userId && (
                <>
                  <FavoriteContent>
                    <Link to={`/contents/${content.contentId}`}>
                      <img src={content.imageUrl} alt="contentImage" />
                    </Link>
                  </FavoriteContent>
                  <DeleteButton
                    type="submit"
                    onClick={() => handleClickFavorite(content.contentId)}
                  >
                    삭제
                  </DeleteButton>
                </>
              )}
            </li>
          ))}
        </List>
      )}
    </Container>
  );
}
