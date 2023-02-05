import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { themeStore } from '../../stores/ThemeStore';
import defaultTheme from '../../styles/defaultTheme';
import RecommendTheme from './RecommendTheme';

const context = describe;

describe('RecommendTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  themeStore.fetchHitThemes();

  function renderRecommendTheme() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <RecommendTheme />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  context('추천 테마 리스트가 존재할 때', () => {
    it('추천 테마 목록 반환', async () => {
      renderRecommendTheme();

      await waitFor(() => {
        screen.findByText(/꼭 봐야할 미드 TOP 5/);
        screen.findByText(/골든 글로브 수상작/);
        screen.findByText(/제 58회 백상예술대상 후보작/);
      });
    });
  });
});
