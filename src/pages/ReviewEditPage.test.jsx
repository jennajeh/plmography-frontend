import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ReviewEditPage from './ReviewEditPage';

const context = describe;

const navigate = jest.fn();
const location = jest.fn();
const split = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },

  useLocation() {
    return location;
  },

  split() {
    return split;
  },
}));

describe('ReviewEditPage', () => {
  function renderReviewEditPage() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <ReviewEditPage />
      </ThemeProvider>
    ));
  }

  context('로그인 하지 않고 접근한 경우', () => {
    it('에러 메시지를 보여준다', async () => {
      await act(() => {
        renderReviewEditPage();
      });

      screen.getByText('잘못된 접근입니다.');
    });
  });

  it('리뷰 수정하기 폼을 보여준다', async () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

    await act(() => {
      renderReviewEditPage();
    });

    await waitFor(() => {
      screen.getByText('내가 쓴 리뷰 수정');
    });
  });
});
