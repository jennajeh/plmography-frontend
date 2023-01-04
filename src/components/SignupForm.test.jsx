import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { userStore } from '../stores/UserStore';
import defaultTheme from '../styles/defaultTheme';
import SignupForm from './SignupForm';

/* eslint-disable react/prop-types */
const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },

  useNavigate() {
    return navigate;
  },
}));

describe('SignupForm', () => {
  function renderSignupForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <SignupForm />
      </ThemeProvider>
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
    userStore.resetSignupStatus();
  });

  context('회원가입에 성공한 경우', () => {
    it('회원가입 완료 페이지가 보인다.', async () => {
      renderSignupForm();

      fireEvent.change(screen.getByLabelText('이메일:'), {
        target: { value: 'jenna@gmail.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'Test123!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: { value: 'Test123!' },
      });

      fireEvent.change(screen.getByLabelText('닉네임:'), {
        target: { value: '전제나' },
      });

      fireEvent.click(screen.getByText('회원가입'));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/greeting');
      });
    });
  });
});
