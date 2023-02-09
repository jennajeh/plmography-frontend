import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import Pagination from '../page/Pagination';
import ContentItem from './ContentItem';

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
`;

export default function ContentsList() {
  const contentStore = useContentStore();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const { contents } = contentStore;

  if (!contents) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      {contents.length ? (
        <>
          <List>
            {contents.map((content) => (
              <ContentItem
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
    </div>
  );
}
