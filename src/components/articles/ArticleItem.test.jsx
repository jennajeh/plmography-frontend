import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import ArticleItem from './ArticleItem';

describe('ArticleItem', () => {
  const article = jest.fn();

  it('renders ArticleItem', async () => {
    render((
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <ArticleItem article={article} />
        </ThemeProvider>
      </MemoryRouter>
    ));
  });
});
