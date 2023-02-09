import {
  render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { postCommentEditFormStore } from '../../stores/PostCommentEditFormStore';
import defaultTheme from '../../styles/defaultTheme';
import PostCommentEditForm from './PostCommentEditForm';

const onSubmit = jest.fn();
const comment = jest.fn();

describe('PostCommentEditForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    postCommentEditFormStore.reset();
  });

  function renderPostCommentEditForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <PostCommentEditForm
          onSubmit={onSubmit}
          comment={comment}
        />
      </ThemeProvider>
    ));
  }

  it('renders PostCommentEditForm', async () => {
    renderPostCommentEditForm();

    await waitFor(() => {
      screen.getByText('댓글 수정');
    });
  });
});
