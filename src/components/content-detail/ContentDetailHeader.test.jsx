import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import ContentDetailHeader from './ContentDetailHeader';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('ContentDetailHeader', async () => {
  render((
    <ThemeProvider theme={defaultTheme}>
      <ContentDetailHeader />
    </ThemeProvider>
  ));

  await waitFor(() => {
    screen.getByText(/찜하기/);
    screen.getByText(/봤어요/);
    screen.getByText(/리뷰쓰기/);
  });
});
