import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import SignupPage from './SignupPage';

describe('SignupPage', () => {
  it('회원가입 버튼이 보인다', () => {
    render((
      <MemoryRouter initialEntries={['/signup']}>
        <ThemeProvider theme={defaultTheme}>
          <SignupPage />
        </ThemeProvider>
      </MemoryRouter>
    ));

    screen.getByText('회원가입');
  });
});
