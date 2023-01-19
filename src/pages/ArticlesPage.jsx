import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import useArticleStore from '../hooks/useArticleStore';

import ArticleList from '../components/articles/ArticleList';

const Container = styled.div`
  height: 100%;
`;

export default function ArticlesPage() {
  const articleStore = useArticleStore();

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    articleStore.fetchArticles({ page, size: 5 });
  }, [page]);

  return (
    <Container>
      <ArticleList />
    </Container>
  );
}
