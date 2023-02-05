import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import defaultTheme from '../../styles/defaultTheme';
import { themeStore } from '../../stores/ThemeStore';
import HitTheme from './HitTheme';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('HitTheme', async () => {
  await themeStore.fetchHitThemes();

  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <HitTheme hitTheme={themeStore.hitThemes[0]} />
      </ThemeProvider>
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('꼭 봐야할 미드 TOP 5');
  });
});
