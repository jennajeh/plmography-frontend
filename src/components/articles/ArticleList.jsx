import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useArticleStore from '../../hooks/useArticleStore';
import Pagination from '../page/Pagination';
import ArticleItem from './ArticleItem';

const Title = styled.h2`
  font-size: ${((props) => props.theme.size.h4)};
  font-weight: bold;
  margin-top: 1em;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  text-align: center;
`;

export default function ArticleList() {
  const articleStore = useArticleStore();
  const { articles } = articleStore;
  const location = useLocation();
  const [searchParams] = useSearchParams();

  if (!articles) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      <Title>볼까 말까 고민된다면? 🧐</Title>
      <div>
        {articles.length ? (
          <>
            <List>
              {articles.map((article) => (
                <ArticleItem
                  key={article.id}
                  article={article}
                />
              ))}
            </List>
            <Pagination
              url={location.pathname}
              total={articleStore.totalPages}
              current={searchParams.get('page') ?? 1}
            />
          </>
        ) : (
          <Error>포스팅이 존재하지 않습니다.</Error>
        )}
      </div>
    </div>
  );
}
