import { cleanup, render } from '@testing-library/react';
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

  it('Category', () => {
    renderCategory();
  });
});
