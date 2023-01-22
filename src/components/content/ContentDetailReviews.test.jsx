import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { reviewStore } from '../../stores/ReviewStore';
import ContentDetailReviews from './ContentDetailReviews';

describe('ContentDetailReviews', () => {
  reviewStore.fetchMyReviews();

  function renderContentDetailReviews() {
    render((
      <MemoryRouter>
        <ContentDetailReviews />
      </MemoryRouter>
    ));
  }

  it('리뷰를 보여준다', () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

    renderContentDetailReviews();

    screen.getByText('내가 쓴 리뷰');
    screen.getByText('모든 리뷰');
  });
});
