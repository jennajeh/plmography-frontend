import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import defaultTheme from '../../styles/defaultTheme';
import { themeStore } from '../../stores/ThemeStore';
import Theme from './Theme';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('Theme', async () => {
  await themeStore.fetchThemes({ page: 1, size: 8 });

  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <Theme theme={themeStore.themes[0]} />
      </ThemeProvider>
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('겨울이면 생각나는 영화');
  });
});
