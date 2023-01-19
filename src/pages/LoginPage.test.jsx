import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('로그인 버튼이 보인다', () => {
    render((
      <MemoryRouter initialEntries={['/login']}>
        <ThemeProvider theme={defaultTheme}>
          <LoginPage />
        </ThemeProvider>
      </MemoryRouter>
    ));

    screen.getByText('로그인');
  });
});
