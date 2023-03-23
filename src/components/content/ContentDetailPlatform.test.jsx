import {
  cleanup,
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import ContentDetailPlatform from './ContentDetailPlatform';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('ContentDetailPlatform', async () => {
  render((
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>
        <ContentDetailPlatform />
      </MemoryRouter>
    </ThemeProvider>
  ));

  screen.getByText(/Loading/);
});
