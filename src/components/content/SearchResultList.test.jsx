import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import SearchResultList from './SearchResultList';

const context = describe;

describe('ContentsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderSearchResultList() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <SearchResultList />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  context('작품이 존재할 때', () => {
    it('작품 목록 반환', async () => {
      renderSearchResultList();

      await waitFor(() => {
        screen.findByText(/아바타: 물의 길/);
      });
    });
  });
});
