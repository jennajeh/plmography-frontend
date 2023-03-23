import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { reviewStore } from '../../stores/ReviewStore';
import defaultTheme from '../../styles/defaultTheme';
import ContentDetailReviews from './ContentDetailReviews';

describe('ContentDetailReviews', () => {
  reviewStore.fetchMyReviews();

  function renderContentDetailReviews() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <ContentDetailReviews />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  it('리뷰를 보여준다', () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

    renderContentDetailReviews();

    screen.getByText('내가 쓴 리뷰');
    screen.getByText('모든 리뷰');
  });
});
