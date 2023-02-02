/* eslint-disable no-shadow */
import {
  cleanup, render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ExplorePage from './ExplorePage';
import defaultTheme from '../styles/defaultTheme';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('ExplorePage', async () => async (act) => {
  render((
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>
        <ExplorePage />
      </MemoryRouter>
    </ThemeProvider>
  ));

  act(() => {
    screen.findByText(/작품 탐색/);
  });
});
