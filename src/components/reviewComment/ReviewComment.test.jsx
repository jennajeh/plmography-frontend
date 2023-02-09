import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { reviewCommentStore } from '../../stores/ReviewCommentStore';
import defaultTheme from '../../styles/defaultTheme';
import ReviewComment from './ReviewComment';

let review;
const context = describe;

describe('ContentsList', () => {
  reviewCommentStore.fetchComments();

  function renderReviewComment() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <ReviewComment review={review} />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  context('댓글이 존재할 때', () => {
    it('댓글 목록 출력', async () => {
      renderReviewComment();

      await waitFor(() => {
        screen.findByText(/동의합니다/);
      });
    });
  });
});
