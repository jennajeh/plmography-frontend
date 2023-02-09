import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { postFormStore } from '../../stores/PostFormStore';
import defaultTheme from '../../styles/defaultTheme';
import PostForm from './PostForm';

const context = describe;
const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('PostForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    postFormStore.reset();
  });

  function renderPostForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <PostForm />
      </ThemeProvider>
    ));
  }

  context('글을 올바르게 작성했을 경우', () => {
    it('글 목록으로 이동한다', async () => {
      renderPostForm();

      fireEvent.change(screen.getByLabelText('제목'), {
        target: { value: '점심 메뉴 추천좀' },
      });

      fireEvent.change(screen.getByLabelText('내용'), {
        target: { value: '너무 배고파요' },
      });

      fireEvent.click(screen.getByText('등록'));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/community');
      });
    });
  });

  context('제목을 입력하지 않은 경우', () => {
    it('에러 메시지가 출력된다', async () => {
      renderPostForm();

      fireEvent.change(screen.getByLabelText('내용'), {
        target: { value: '너무 배고파요' },
      });

      fireEvent.click(screen.getByText('등록'));

      await waitFor(() => {
        screen.getByText(/제목을 입력해 주세요/);
      });
    });
  });

  context('내용을 입력하지 않은 경우', () => {
    it('에러 메시지가 출력된다', async () => {
      renderPostForm();

      fireEvent.change(screen.getByLabelText('제목'), {
        target: { value: '점심 메뉴 추천 해주세요' },
      });

      fireEvent.click(screen.getByText('등록'));

      await waitFor(() => {
        screen.getByText(/내용을 입력해 주세요/);
      });
    });
  });
});
