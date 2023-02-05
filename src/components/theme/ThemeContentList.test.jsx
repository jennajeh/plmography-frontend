import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { themeStore } from '../../stores/ThemeStore';
import defaultTheme from '../../styles/defaultTheme';
import ThemeContentList from './ThemeContentList';

const context = describe;

describe('ThemeContentList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  themeStore.fetchThemes({ page: 1, size: 8 });

  function renderThemeList() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <ThemeContentList />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  context('테마 리스트가 존재할 때', () => {
    it('테마 목록 반환', async () => {
      renderThemeList();

      await waitFor(() => {
        screen.findByText('겨울이면 생각나는 영화');
        screen.findByText('애니메이션 TV/영화 모음 10선');
      });
    });
  });
});
