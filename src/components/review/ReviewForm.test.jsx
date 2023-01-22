import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { reviewFormStore } from '../../stores/ReviewFormStore';
import defaultTheme from '../../styles/defaultTheme';
import ReviewForm from './ReviewForm';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('ReviewForm', () => {
  function renderReviewForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <ReviewForm />
      </ThemeProvider>
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
    reviewFormStore.reset();
  });

  context('모든 항목을 올바르게 입력했을 때', () => {
    it('컨텐츠 상세 페이지로 이동한다', async () => async (act) => {
      renderReviewForm();

      fireEvent.click(screen.getByText('선택'));

      fireEvent.change(screen.getByLabelText('평점'), {
        target: { value: '⭐️⭐️⭐️⭐️' },
      });

      fireEvent.change(screen.getByLabelText('리뷰 내용'), {
        target: { value: '재미있어요.' },
      });

      fireEvent.click(screen.getByText('등록하기'));

      await waitFor(() => {
        expect(reviewFormStore.isValidateSuccessful).toBeTruthy();
      });
    });
  });

  context('평점을 선택하지 않았을 때', () => {
    it('에러 메시지를 보여준다', async () => async (act) => {
      renderReviewForm();

      fireEvent.click(screen.getByText('선택'));

      fireEvent.change(screen.getByLabelText('평점'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('리뷰 내용'), {
        target: { value: '재미있어요.' },
      });

      fireEvent.click(screen.getByText('등록하기'));

      await waitFor(() => {
        screen.getByText(/별점을 선택해 주세요/);
      });
    });
  });

  context('리뷰 내용을 입력하지 않았을 때', () => {
    it('에러 메시지를 보여준다', async () => async (act) => {
      renderReviewForm();

      fireEvent.click(screen.getByText('선택'));

      fireEvent.change(screen.getByLabelText('평점'), {
        target: { value: '⭐️⭐️⭐️⭐️' },
      });

      fireEvent.change(screen.getByLabelText('리뷰 내용'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByText('등록하기'));

      await waitFor(() => {
        screen.getByText(/내용을 입력해 주세요/);
      });
    });
  });
});
