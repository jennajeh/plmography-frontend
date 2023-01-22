import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { reviewEditFormStore } from '../../stores/ReviewEditFormStore';
import defaultTheme from '../../styles/defaultTheme';
import ReviewEditForm from './ReviewEditForm';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('ReviewEditForm', () => {
  function renderReviewEditForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <ReviewEditForm />
      </ThemeProvider>
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
    reviewEditFormStore.reset();
  });

  context('모든 항목을 올바르게 입력했을 때', () => {
    it('컨텐츠 상세 페이지로 이동한다', async () => async (act) => {
      renderReviewEditForm();

      fireEvent.change(screen.getByLabelText('리뷰 내용'), {
        target: { value: '재미있어요.' },
      });

      fireEvent.click(screen.getByText('수정하기'));

      await waitFor(() => {
        expect(reviewEditFormStore.isValidateSuccessful).toBeTruthy();
      });
    });
  });

  context('리뷰 내용을 입력하지 않았을 때', () => {
    it('validateStatus 가 fail 로 바뀐다', async () => async (act) => {
      renderReviewEditForm();

      fireEvent.change(screen.getByLabelText('리뷰 내용'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByText('수정하기'));

      await waitFor(() => {
        expect(reviewEditFormStore.isValidateSuccessful).toBeFalsy();
      });
    });
  });
});
