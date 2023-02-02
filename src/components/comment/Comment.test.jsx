import {
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { commentStore } from '../../stores/CommentStore';
import defaultTheme from '../../styles/defaultTheme';
import Comment from './Comment';

let review;
const context = describe;

describe('ContentsList', () => {
  commentStore.fetchComments();

  function renderComment() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <Comment review={review} />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  context('댓글이 존재할 때', () => {
    it('댓글 목록 출력', async () => {
      renderComment();

      await waitFor(() => {
        screen.findByText(/동의합니다/);
      });
    });
  });
});
