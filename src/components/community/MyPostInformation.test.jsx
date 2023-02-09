import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import MyPostInformation from './MyPostInformation';

describe('MyPostInformation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderMyPostInformation() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <MyPostInformation />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  it('renders MyPostInformation', async () => {
    renderMyPostInformation();

    await waitFor(() => {
      screen.findByText(/내가 쓴 글/);
    });
  });
});
