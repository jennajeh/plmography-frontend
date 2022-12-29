import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ContentDetailPage from './ContentDetailPage';

test('ContentDetailPage', async () => {
  render((
    <MemoryRouter initialEntries={['/contents/1']}>
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route path="/contents/:id" element={<ContentDetailPage />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByRole('button', { name: '찜하기' });
  });
});
