import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import Home from './Home';

describe('Home', () => {
  function renderHome() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <Home />
      </ThemeProvider>
    ));
  }

  it('홈페이지를 보여준다', () => {
    renderHome();

    screen.getByText(/오늘의 TOP 6/);
  });
});
