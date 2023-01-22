import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ArticlesPage from './ArticlesPage';

describe('ArticlesPage', () => {
  function renderArticlesPage() {
    render((
      <MemoryRouter initialEntries={['/articles']}>
        <ThemeProvider theme={defaultTheme}>
          <ArticlesPage />
        </ThemeProvider>
      </MemoryRouter>
    ));
  }

  it('ArticlesPage 를 보여준다', async () => {
    await act(() => {
      renderArticlesPage();
    });

    screen.getByText('볼까 말까 고민된다면?');
  });
});
