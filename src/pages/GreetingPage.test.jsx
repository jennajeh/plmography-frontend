import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import GreetingPage from './GreetingPage';

describe('GreetingPage', () => {
  function renderGreetingPage() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <GreetingPage />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  it('GreetingPage', () => {
    renderGreetingPage();

    screen.getByText('회원가입이 완료되었습니다.');
  });
});
