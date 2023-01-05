import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
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
    userStore.resetSignupStatus();
  });

  // context('회원가입에 성공한 경우', () => {
  //   it('회원가입 완료 페이지가 보인다.', async () => {
  //     renderSignupForm();

  //     fireEvent.change(screen.getByLabelText('이메일:'), {
  //       target: { value: 'jenna@gmail.com' },
  //     });

  //     fireEvent.change(screen.getByLabelText('비밀번호:'), {
  //       target: { value: 'Test123!' },
  //     });

  //     fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
  //       target: { value: 'Test123!' },
  //     });

  //     fireEvent.change(screen.getByLabelText('닉네임:'), {
  //       target: { value: '전제나' },
  //     });

  //     fireEvent.click(screen.getByLabelText('여성'));

  //     fireEvent.click(screen.getByLabelText('여성'));

  //     userEvent.selectOptions(
  //       screen.getByRole('combobox'),
  //       screen.getByRole('option', { name: '1990' }),
  //     );

  //     fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

  //     await waitFor(() => {
  //       screen.getByText(/회원가입이 완료되었습니다./);
  //     });
  //   });
  // });

  context('닉네임을 비워놨을 경우', () => {
    it('에러 메세지가 보인다', async () => {
      renderSignupForm();

      fireEvent.change(screen.getByLabelText('닉네임:'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('이메일:'), {
        target: { value: 'jenna@gmail.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'Test123!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: { value: 'Test123!' },
      });

      fireEvent.click(screen.getByText('회원가입'));

      await waitFor(() => {
        screen.getByText(/닉네임을 입력해 주세요./);
      });
    });
  });

  context('이메일을 비워놨을 경우', () => {
    it('에러 메세지가 보인다', async () => {
      renderSignupForm();

      fireEvent.change(screen.getByLabelText('닉네임:'), {
        target: { value: '전제나' },
      });

      fireEvent.change(screen.getByLabelText('이메일:'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'Test123!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: { value: 'Test123!' },
      });

      fireEvent.click(screen.getByText('회원가입'));

      await waitFor(() => {
        screen.getByText(/이메일을 입력해 주세요./);
      });
    });
  });

  context('비밀번호를 비워놨을 경우', () => {
    it('에러 메세지가 보인다', async () => {
      renderSignupForm();

      fireEvent.change(screen.getByLabelText('닉네임:'), {
        target: { value: '전제나' },
      });

      fireEvent.change(screen.getByLabelText('이메일:'), {
        target: { value: 'jenna@gmail.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: { value: 'Test123!' },
      });

      fireEvent.click(screen.getByText('회원가입'));

      await waitFor(() => {
        screen.getByText(/비밀번호를 입력해 주세요./);
      });
    });
  });

  context('비밀번호 확인을 비워놨을 경우', () => {
    it('에러 메세지가 보인다', async () => {
      renderSignupForm();

      fireEvent.change(screen.getByLabelText('닉네임:'), {
        target: { value: '전제나' },
      });

      fireEvent.change(screen.getByLabelText('이메일:'), {
        target: { value: 'jenna@gmail.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'Test123!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByText('회원가입'));

      await waitFor(() => {
        screen.getByText(/비밀번호를 입력해 주세요./);
      });
    });
  });
});
