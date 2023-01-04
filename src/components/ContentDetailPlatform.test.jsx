import {
  cleanup,
  render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
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
      <ContentDetailPlatform />
    </ThemeProvider>
  ));

  await waitFor(() => {
    screen.getByText(/여기서 감상할 수 있어요/);
  });
});
