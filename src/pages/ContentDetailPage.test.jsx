import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { contentStore } from '../stores/ContentStore';
import defaultTheme from '../styles/defaultTheme';
import ContentDetailPage from './ContentDetailPage';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('ContentDetailPage', async () => {
  render((
    <MemoryRouter initialEntries={['/contents/1']}>
      <ThemeProvider theme={defaultTheme}>
        <ContentDetailPage />
      </ThemeProvider>
    </MemoryRouter>
  ));

  await contentStore.fetchContent(1);

  await waitFor(() => {
    screen.getByText(/찜하기/);
    screen.getByText(/여기서 감상할 수 있어요/);
    screen.getByText(/작품 정보/);
    screen.getByText(/출연/);
    screen.getByText(/관련 영상/);
    screen.getByRole('button', { name: '찜하기' });
  });
});
