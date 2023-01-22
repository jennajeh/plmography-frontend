import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import CommentForm from './CommentForm';

describe('CommentForm', () => {
  it('renders CommentForm', () => {
    const onSubmit = jest.fn();

    render((
      <ThemeProvider theme={defaultTheme}>
        <CommentForm onSubmit={onSubmit} />
      </ThemeProvider>
    ));

    screen.getByText('댓글 달기');
  });
});
