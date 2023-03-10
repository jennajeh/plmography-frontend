/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useContentStore from '../../hooks/useContentStore';
import useUserStore from '../../hooks/useUserStore';
import Pagination from '../page/Pagination';
import SearchResultContentItem from './SearchResultContentItem';

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1em;
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  text-align: center;
  color: white;
`;

const Button = styled.button`
  width: 5em;
  height: 5em;
`;

const FavoriteContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1em;
  justify-content: center;
  align-items: center;
  
  img {
    width: 8em;
  }
`;

export default function SearchResultList() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const userStore = useUserStore();
  const contentStore = useContentStore();

  const { user } = userStore;
  const { contents, favoriteContents } = contentStore;
  const { id: userId, favoriteContentIds } = user;
  const favoriteContentId = favoriteContentIds?.join(',');

  const handleClickMyProfile = async () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    navigate('/profile');
  };

  const handleClickFavorite = async (id) => {
    await contentStore.toggleFavorite(id);

    contentStore.fetchFavoriteContents({ userId, favoriteContentId });
  };

  if (!contents || !user || !favoriteContents) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {contents.length ? (
        <>
          <List>
            {contents.map((content) => (
              <SearchResultContentItem
                key={content.id}
                content={content}
              />
            ))}
          </List>
          <Pagination
            url={location.pathname}
            total={contentStore.totalPages}
            current={searchParams.get('page') ?? 1}
          />
          <Button type="button" onClick={handleClickMyProfile}>
            ?????? ?????????
          </Button>
        </>
      ) : (
        <>
          <Error>????????? ???????????? ????????????.</Error>
          <Button type="button" onClick={handleClickMyProfile}>
            ?????? ?????????
          </Button>
        </>
      )}
      <div>
        <h3>????????? ????????????</h3>
        <span>{favoriteContentIds?.length}</span>
        {favoriteContents.length ? (
          <ul>
            {favoriteContents.map((content, idx) => (
              <li key={idx}>
                <FavoriteContent>
                  <img src={content.imageUrl} alt="contentImage" />
                </FavoriteContent>
                <button
                  type="submit"
                  onClick={() => handleClickFavorite(content.contentId)}
                >
                  ??????
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
