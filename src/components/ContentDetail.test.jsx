import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { contentStore } from '../stores/ContentStore';
import defaultTheme from '../styles/defaultTheme';
import ContentDetail from './ContentDetail';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('ContentDetail', async () => {
  render((
    <ThemeProvider theme={defaultTheme}>
      <ContentDetail />
    </ThemeProvider>
  ));

  await contentStore.fetchContent(1);

  await waitFor(() => {
    screen.getByText(/찜하기/);
    screen.getByText(/여기서 감상할 수 있어요/);
    screen.getByText(/작품 정보/);
  });
});
