import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import ArticleDetail from './ArticleDetail';

describe('ArticleDetail', () => {
  it('renders ArticleDetail', () => {
    render((
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <ArticleDetail />
        </ThemeProvider>
      </MemoryRouter>
    ));
  });
});
