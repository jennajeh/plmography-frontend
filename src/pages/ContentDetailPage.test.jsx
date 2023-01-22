import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { contentStore } from '../stores/ContentStore';
import defaultTheme from '../styles/defaultTheme';
import ContentDetailPage from './ContentDetailPage';

test('ContentDetailPage', async () => async (act) => {
  contentStore.fetchContent(1);

  render((
    <MemoryRouter initialEntries={['/contents/1']}>
      <ThemeProvider theme={defaultTheme}>
        <ContentDetailPage />
      </ThemeProvider>
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText(/찜하기/);
    screen.getByText(/여기서 감상할 수 있어요/);
    screen.getByText(/작품 정보/);
    screen.getByText(/출연/);
    screen.getByText(/관련 영상/);
  });
});
