import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import Category from './Category';

describe('Category', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderCategory() {
    render((
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <Category />
        </ThemeProvider>
      </MemoryRouter>
    ));
  }

  it('renders Category', () => {
    renderCategory();

    screen.getByText(/검색하기/);
    screen.getByText(/플랫폼/);
    screen.getByText(/장르/);
    screen.getByText(/개봉연도/);
  });
});
