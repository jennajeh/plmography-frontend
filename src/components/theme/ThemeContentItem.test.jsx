import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import defaultTheme from '../../styles/defaultTheme';
import { contentStore } from '../../stores/ContentStore';
import ThemeContentItem from './ThemeContentItem';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('ThemeContentItem', async () => {
  await contentStore.fetchContents({
    page: 1,
    size: 8,
    filter: {
      date: 2022,
      genre: '16',
      platformData: 'netfilx',
      type: 'movie',
    },
  });

  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <ThemeContentItem content={contentStore.contents[0]} />
      </ThemeProvider>
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByRole('heading', { level: 4, name: /DC 리그 오브 슈퍼-펫/ });
  });
});
