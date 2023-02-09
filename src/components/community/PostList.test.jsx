import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { postStore } from '../../stores/PostStore';
import defaultTheme from '../../styles/defaultTheme';
import PostList from './PostList';

const context = describe;

describe('PostList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  postStore.fetchPosts({ page: 1, size: 8, filter: {} });

  function renderPostList() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <PostList />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  context('게시글이 존재할 경우', () => {
    it('게시글 목록을 반환한다', async () => {
      renderPostList();

      await waitFor(() => {
        screen.findByText(/아바타/);
      });
    });
  });
});
