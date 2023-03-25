import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import ExpiredContentItem from '../content/ExpiredContentItem';

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  color: ${((props) => props.theme.text.white)};
  font-size: 26px;
  font-weight: bold;
  margin: 5px 10px 25px 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 26px;
  margin: 5px 0 25px 0;
  border: none;
  color: ${((props) => props.theme.text.white)};
  background-color: transparent;
`;

const Container = styled.article`
  display: flex;
  gap: 16px;
`;

const List = styled.ul`
  display: flex;
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  text-align: center;
  color: white;
`;

export default function HomeExpireContents() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const contentStore = useContentStore();

  const date = new Date();
  const month = date.getMonth() + 1;

  const { contents } = contentStore;

  const sliceContents = contents.slice(0, 5);

  useEffect(() => {
    contentStore.fetchExpiredNetflix({ month, page, size: 5 });
  }, [page, month]);

  if (!contents) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header>
        <Title>
          {month}
          월 넷플릭스 종료 예정작
        </Title>
        <StyledLink to="/expiredNetflix">
          〉
        </StyledLink>
      </Header>
      <Container>
        {sliceContents.length >= 1 ? (
          <List>
            {sliceContents.map((content) => (
              <ExpiredContentItem
                key={content.id}
                content={content}
              />
            ))}
          </List>
        ) : (
          <Error>작품이 존재하지 않습니다.</Error>
        )}
      </Container>
    </>
  );
}
