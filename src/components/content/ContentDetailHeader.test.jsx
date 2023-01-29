import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
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
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <ContentDetailHeader />
      </ThemeProvider>
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText(/찜하기/);
    screen.getByText(/봤어요/);
    screen.getByText(/리뷰쓰기/);
  });
});
