import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { reviewStore } from '../../stores/ReviewStore';
import defaultTheme from '../../styles/defaultTheme';
import OtherReview from './OtherReview';

describe('OtherReview', () => {
  reviewStore.fetchReviews({ page: 1, size: 5 });

  function renderOtherReview() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <OtherReview />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  it('다른 사람의 리뷰를 보여준다', () => {
    renderOtherReview();

    screen.getByText('모든 리뷰');
  });
});
