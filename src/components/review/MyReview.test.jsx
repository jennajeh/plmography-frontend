import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { reviewStore } from '../../stores/ReviewStore';
import MyReview from './MyReview';

describe('MyReview', () => {
  reviewStore.fetchMyReviews();

  function renderMyReview() {
    render((
      <MemoryRouter>
        <MyReview />
      </MemoryRouter>
    ));
  }

  it('내가 쓴 리뷰를 보여준다', () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

    renderMyReview();

    screen.getByText('내가 쓴 리뷰');
  });
});
