/* eslint-disable no-unused-vars */
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  cleanup,
  render, screen, waitFor,
} from '@testing-library/react';
import defaultTheme from '../../styles/defaultTheme';
import { contentStore } from '../../stores/ContentStore';
import HomeDailyRanking from './HomeDailyRanking';

test('HomeDailyRanking', async () => async (act) => {
  afterEach(() => {
    cleanup();
  });

  contentStore.fetchTopRatedContents();

  render((
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <HomeDailyRanking />
      </ThemeProvider>
    </MemoryRouter>

  ));

  act(() => {
    screen.findByText(/랭킹/);
  });
});
