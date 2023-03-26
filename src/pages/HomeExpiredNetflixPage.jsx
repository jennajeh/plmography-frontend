import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import AllExpiredContentItems from '../components/content/AllExpiredContentItems';
import Pagination from '../components/page/Pagination';
import useContentStore from '../hooks/useContentStore';

const Container = styled.div`
  color: ${((props) => props.theme.text.white)};
`;

const Title = styled.h1`
  display: flex;
  color: ${((props) => props.theme.text.white)};
  font-size: 26px;
  font-weight: bold;
  margin: 2em 0;
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

  const { expiredContents } = contentStore;

  useEffect(() => {
    contentStore.fetchExpiredNetflix({ month, page, size: 8 });
  }, [page, month]);

  if (!expiredContents) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>
        {month}
        월 넷플릭스 종료 예정작
      </Title>
      {expiredContents.length ? (
        <>
          <List>
            {expiredContents.map((content) => (
              <AllExpiredContentItems
                key={content.id}
                content={content}
              />
            ))}
          </List>
          <Pagination
            url={location.pathname}
            total={contentStore.expiredTotalPages}
            current={searchParams.get('page') ?? 1}
          />
        </>
      ) : (
        <Error>작품이 존재하지 않습니다.</Error>
      )}
    </Container>
  );
}
