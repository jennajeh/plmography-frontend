import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { postStore } from '../../stores/PostStore';
import defaultTheme from '../../styles/defaultTheme';
import PostDetail from './PostDetail';

describe('PostDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderPostDetail() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <PostDetail />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  it('renders PostDetail', async () => {
    await postStore.fetchPost(1);
    renderPostDetail();

    await waitFor(() => {
      screen.findByText(/조회수/);
    });
  });
});
