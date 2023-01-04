import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { contentStore } from '../stores/ContentStore';
import defaultTheme from '../styles/defaultTheme';
import ContentsList from './ContentsList';

let contents;
const context = describe;

describe('ContentsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  contentStore.fetchContents({ page: 1, size: 8 });

  function renderContentsList() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <ContentsList contents={contents} />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  context('작품이 존재할 때', () => {
    it('작품 목록 반환', async () => {
      renderContentsList();

      await waitFor(() => {
        screen.findByText(/아바타: 물의 길/);
      });
    });
  });
});
