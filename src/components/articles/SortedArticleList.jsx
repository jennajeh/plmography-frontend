import styled from 'styled-components';
import useArticleStore from '../../hooks/useArticleStore';
import ArticleItem from './ArticleItem';

const Title = styled.h1`
  font-size: ${((props) => props.theme.size.h4)};
  font-weight: bold;
  margin-top: 1em;
`;

const List = styled.ul`
  display: flex;
  gap: 16px;
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  text-align: center;
`;

export default function SortedArticleList() {
  const articleStore = useArticleStore();

  const { sortedArticles } = articleStore;

  if (!sortedArticles) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      <Title>볼까 말까 고민된다면? 🧐</Title>
      {sortedArticles.length ? (
        <List>
          {sortedArticles.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
            />
          ))}
        </List>
      ) : (
        <Error>게시물이 존재하지 않습니다.</Error>
      )}
    </div>
  );
}
