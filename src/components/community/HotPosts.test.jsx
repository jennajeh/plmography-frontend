import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import HotPosts from './HotPosts';

describe('HotPosts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderHotPosts() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <HotPosts />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  it('renders HotPosts', async () => {
    renderHotPosts();

    await waitFor(() => {
      screen.findByText(/인기글/);
    });
  });
});
