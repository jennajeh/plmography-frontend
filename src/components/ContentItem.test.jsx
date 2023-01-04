import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import defaultTheme from '../styles/defaultTheme';
import { contentStore } from '../stores/ContentStore';
import ContentItem from './ContentItem';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('ContentItem', async () => {
  await contentStore.fetchContents({ page: 1, size: 8 });

  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <ContentItem content={contentStore.contents[0]} />
      </ThemeProvider>
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByRole('heading', { level: 4, name: /쩨쩨의 이중생활/ });
    screen.getByText(/쩨쩨/);
  });
});
