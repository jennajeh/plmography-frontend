import {
  render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { postCommentFormStore } from '../../stores/PostCommentFormStore';
import defaultTheme from '../../styles/defaultTheme';
import PostCommentForm from './PostCommentForm';

const onSubmit = jest.fn();

describe('PostCommentForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    postCommentFormStore.reset();
  });

  function renderPostCommentForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <PostCommentForm onSubmit={onSubmit} />
      </ThemeProvider>
    ));
  }

  it('renders postCommentForm', async () => {
    renderPostCommentForm();

    await waitFor(() => {
      screen.getByText('댓글 달기');
    });
  });
});
