import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { contentStore } from '../stores/ContentStore';
import defaultTheme from '../styles/defaultTheme';
import ContentsList from './ContentsList';

test('ContentsList', async () => {
  contentStore.fetchContents({ page: 1, size: 8 });

  render((
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>
        <ContentsList />
      </MemoryRouter>
    </ThemeProvider>
  ));

  screen.getByText(/작품이 존재하지 않습니다/);

  await waitFor(() => {
    screen.getByText(/아바타/);
  });
});
