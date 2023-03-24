import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import AllExpiredContentItems from '../components/content/AllExpiredContentItems';
import Pagination from '../components/page/Pagination';
import useContentStore from '../hooks/useContentStore';

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

export default function HomeExpiredNetflixPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const contentStore = useContentStore();

  const date = new Date();
  const month = date.getMonth() + 1;
  const page = searchParams.get('page') ?? 1;

  const { contents } = contentStore;

  useEffect(() => {
    contentStore.fetchExpiredNetflix({ month, page, size: 8 });
  }, [page, month]);

  if (!contents) {
    return <p>Loading...</p>;
  }

  console.log('contents', contents);
  console.log('page', contentStore.totalPages);

  return (
    <Container>
      {contents.length ? (
        <>
          <List>
            {contents.map((content) => (
              <AllExpiredContentItems
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
