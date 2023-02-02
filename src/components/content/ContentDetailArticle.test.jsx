/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { articleStore } from '../../stores/ArticleStore';
import defaultTheme from '../../styles/defaultTheme';
import ContentDetailArticle from './ContentDetailArticle';

const context = describe;

describe('ContentDetailArticle', () => {
  articleStore.fetchArticles({ page: 1, size: 5 });

  function renderContentDetailArticle() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <ContentDetailArticle />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  context('아티클 포스팅이 존재할 때', () => {
    it('포스팅 출력', async () => {
      renderContentDetailArticle();

      await waitFor(() => {
        screen.findByText(/해리포터와 마법사의 돌/);
      });
    });
  });
});
