import styled from 'styled-components';
import useArticleStore from '../../hooks/useArticleStore';
import ArticleItem from './ArticleItem';

const Title = styled.h1`
  color: ${((props) => props.theme.text.white)};
  font-size: 26px;
  font-weight: bold;
  margin: 5px 0 25px 0;
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

  let count = 1;

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
              count={count++}
            />
          ))}
        </List>
      ) : (
        <Error>게시물이 존재하지 않습니다.</Error>
      )}
    </div>
  );
}
