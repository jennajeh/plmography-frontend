/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import useUserStore from '../../hooks/useUserStore';
import Pagination from '../page/Pagination';
import SearchResultContentItem from './SearchResultContentItem';

const Container = styled.div`
  color: white;
`;

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

export default function SearchResultList() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const userStore = useUserStore();
  const contentStore = useContentStore();

  const { user } = userStore;
  const { contents, favoriteContents } = contentStore;

  if (!contents || !user || !favoriteContents) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
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
        </>
      ) : (
        <Error>작품이 존재하지 않습니다.</Error>
      )}
    </Container>
  );
}
