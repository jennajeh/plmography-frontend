import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ThemesDetailPage from './ThemesDetailPage';

describe('ThemesDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderThemesDetailPage() {
    render((
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <ThemesDetailPage />
        </ThemeProvider>
      </MemoryRouter>
    ));
  }

  it('renders ThemesPage', () => {
    renderThemesDetailPage();
  });
});
