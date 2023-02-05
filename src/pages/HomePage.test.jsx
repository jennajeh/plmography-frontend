/* eslint-disable no-unused-vars */
import { cleanup, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { contentStore } from '../stores/ContentStore';
import defaultTheme from '../styles/defaultTheme';
import HomePage from './HomePage';

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  contentStore.fetchTopRatedContents();

  function renderHomePage() {
    render(
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <HomePage />
        </ThemeProvider>
      </MemoryRouter>,
    );
  }

  it('renders HomePage', async () => async (act) => {
    await waitFor(() => renderHomePage());
  });
});
