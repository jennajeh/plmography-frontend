import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ArticlesPage from './ArticlesPage';

test('ArticlesPage', async () => async (act) => {
  function renderArticlesPage() {
    render((
      <MemoryRouter initialEntries={['/articles']}>
        <ThemeProvider theme={defaultTheme}>
          <ArticlesPage />
        </ThemeProvider>
      </MemoryRouter>
    ));
  }

  it('renders ArticlesPage', () => {
    renderArticlesPage();
  });
});
