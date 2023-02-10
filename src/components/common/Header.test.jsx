/* eslint-disable react/prop-types */
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import Header from './Header';

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

const context = describe;

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderHeader() {
    render(<Header />);
  }

  it('헤더 메뉴 렌더링', async () => {
    renderHeader();

    await waitFor(() => {
      screen.getByText('테마 추천');
      screen.getByText('커뮤니티');
      screen.getByText('탐색');
      screen.getByText('신작');
      screen.getByText('이벤트');
      screen.getByText('작품 제안');
    });
  });

  // context('로그인 했을 때', () => {
  //   beforeEach(() => {
  //     localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
  //   });

  //   it('로그아웃 버튼이 보인다', () => {
  //     renderHeader();

  //     screen.getByText('로그아웃');
  //   });
  // });

  // context('로그아웃 버튼을 클릭하면', () => {
  //   it('홈 화면으로 이동한다', () => {
  //     renderHeader();

  //     fireEvent.click(screen.getByText('로그아웃'));

  //     expect(navigate).toBeCalledWith('/');
  //   });

  //   it('로그인 버튼이 보인다', () => {
  //     renderHeader();

  //     fireEvent.click(screen.getByText('로그아웃'));

  //     screen.getByText('로그인');
  //   });
  // });
});
