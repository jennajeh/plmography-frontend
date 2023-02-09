import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import ReviewCommentForm from './ReviewCommentForm';

describe('ReviewCommentForm', () => {
  it('renders ReviewCommentForm', () => {
    const onSubmit = jest.fn();

    render((
      <ThemeProvider theme={defaultTheme}>
        <ReviewCommentForm onSubmit={onSubmit} />
      </ThemeProvider>
    ));

    screen.getByText('댓글 달기');
  });
});
