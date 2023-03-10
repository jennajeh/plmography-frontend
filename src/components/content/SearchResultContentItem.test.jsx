import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import defaultTheme from '../../styles/defaultTheme';
import { contentStore } from '../../stores/ContentStore';
import SearchResultContentItem from './SearchResultContentItem';

test('SearchResultContentItem', async () => {
  await contentStore.fetchContents({
    page: 1,
    size: 8,
    filter: {},
  });

  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <SearchResultContentItem content={contentStore.contents[0]} />
      </ThemeProvider>
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('아리스 인 보더랜드');
  });
});
