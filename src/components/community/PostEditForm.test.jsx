import { ThemeProvider } from 'styled-components';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import defaultTheme from '../../styles/defaultTheme';
import { postEditFormStore } from '../../stores/PostEditFormStore';
import PostEditForm from './PostEditForm';
import { postStore } from '../../stores/PostStore';

const context = describe;
const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useParams() {
    return { id: 1 };
  },
}));

describe('PostForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    postEditFormStore.reset();
  });

  function renderPostEditForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <PostEditForm />
      </ThemeProvider>
    ));
  }

  context('수정한 내용이 올바르게 작성됐을 경우', () => {
    it('수정한 게시글로 이동한다', async () => {
      await postStore.fetchPost(1);
      renderPostEditForm();

      fireEvent.change(screen.getByLabelText('제목'), {
        target: { value: '점심 메뉴 추천좀' },
      });

      fireEvent.click(screen.getByText('수정'));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/community/posts/1');
      });
    });
  });

  context('제목을 입력하지 않은 경우', () => {
    it('에러 메시지가 출력된다', async () => {
      await postStore.fetchPost(1);
      renderPostEditForm();

      fireEvent.change(screen.getByLabelText('제목'), {
        target: { value: '' },
      });

      screen.getByText(/제목을 입력해 주세요/);
    });
  });

  context('내용을 입력하지 않은 경우', () => {
    it('에러 메시지가 출력된다', async () => {
      await postStore.fetchPost(1);
      renderPostEditForm();

      fireEvent.change(screen.getByLabelText('내용'), {
        target: { value: '' },
      });

      await waitFor(() => {
        screen.getByText(/내용을 입력해 주세요/);
      });
    });
  });
});
