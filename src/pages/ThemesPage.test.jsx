import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ThemesPage from './ThemesPage';

describe('ThemesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderThemesPage() {
    render((
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <ThemesPage />
        </ThemeProvider>
      </MemoryRouter>
    ));
  }

  it('renders ThemesPage', () => {
    renderThemesPage();
  });
});
