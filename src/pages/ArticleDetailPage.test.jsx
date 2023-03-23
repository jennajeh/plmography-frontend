import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ArticleDetailPage from './ArticleDetailPage';

describe('ArticleDetailPage', () => {
  function renderArticleDetailPage() {
    render((
      <MemoryRouter initialEntries={['/articles/1']}>
        <ThemeProvider theme={defaultTheme}>
          <ArticleDetailPage />
        </ThemeProvider>
      </MemoryRouter>
    ));
  }

  it('ArticleDetailPage 를 보여준다', async () => {
    await act(() => {
      renderArticleDetailPage();
    });
  });
});
