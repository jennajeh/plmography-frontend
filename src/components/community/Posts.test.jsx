import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { postStore } from '../../stores/PostStore';
import defaultTheme from '../../styles/defaultTheme';
import Posts from './Posts';

const context = describe;

describe('ContentsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  postStore.fetchPosts({ page: 1, size: 8, filter: {} });

  function renderPosts() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  context('게시글이 존재할 경우', () => {
    it('게시글 목록을 반환한다', async () => {
      renderPosts();

      await waitFor(() => {
        screen.findByText(/아바타/);
      });
    });
  });
});
