import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ExplorePage from './ExplorePage';
import defaultTheme from '../styles/defaultTheme';

test('ExplorePage', async () => {
  render((
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>
        <ExplorePage />
      </MemoryRouter>
    </ThemeProvider>
  ));

  screen.getByText(/작품이 존재하지 않습니다/);

  await waitFor(() => {
    screen.getByText(/작품 탐색/);
  });
});
