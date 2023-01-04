import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import LoginForm from './LoginForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
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

const context = describe;

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderLoginForm() {
    render(
      <ThemeProvider theme={defaultTheme}>
        <LoginForm />
      </ThemeProvider>,
    );
  }

  context('로그인에 성공한 경우', () => {
    it('이전 페이지로 이동한다', async () => {
      renderLoginForm();

      screen.getByRole('heading', { name: 'USER LOGIN' });

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: 'jenna@gmail.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'Test123!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        expect(navigate).toBeCalledWith(-1);
      });
    });
  });

  context('이메일 필드를 비워놨을 경우', () => {
    it('이메일 에러 메세지가 보인다', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'Test123!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('이메일을 입력해 주세요.');
      });
    });
  });

  context('비밀번호 필드를 비워놨을 경우', () => {
    it('비밀번호 에러 메세지가 보인다', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: 'jenna@gmail.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('비밀번호를 입력해 주세요.');
      });
    });
  });

  context('이메일과 비밀번호가 올바르지 않은 경우', () => {
    it('에러 메세지가 보인다', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: 'xxx@gmail.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'Test000!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('이메일 혹은 비밀번호가 맞지 않습니다');
      });
    });
  });
});
