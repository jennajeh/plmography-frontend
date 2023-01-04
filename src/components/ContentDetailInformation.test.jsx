import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ContentDetailInformation from './ContentDetailInformation';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('ContentDetailInformation', async () => {
  render((
    <ThemeProvider theme={defaultTheme}>
      <ContentDetailInformation />
    </ThemeProvider>
  ));

  await waitFor(() => {
    screen.getByText(/작품 정보/);
    screen.getByText(/출연/);
    screen.getByText(/관련 영상/);
  });
});
