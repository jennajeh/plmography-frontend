import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { reviewStore } from '../../stores/ReviewStore';
import defaultTheme from '../../styles/defaultTheme';
import MyReview from './MyReview';

describe('MyReview', () => {
  reviewStore.fetchMyReviews();

  function renderMyReview() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <MyReview />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  it('내가 쓴 리뷰를 보여준다', () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

    renderMyReview();

    screen.getByText('내가 쓴 리뷰');
  });
});
