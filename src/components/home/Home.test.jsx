import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import Home from './Home';

describe('Home', () => {
  function renderHome() {
    render((
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    ));
  }

  it('홈페이지를 보여준다', () => {
    renderHome();

    screen.getByText(/오늘의 랭킹/);
  });
});
