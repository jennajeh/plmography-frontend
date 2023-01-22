import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ReviewCreatePage from './ReviewCreatePage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('ReviewCreatePage', () => {
  function renderReviewCreatePage() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <ReviewCreatePage />
      </ThemeProvider>
    ));
  }

  it('리뷰 작성 폼을 보여준다', async () => {
    renderReviewCreatePage();

    screen.getByText('리뷰 작성하기');
  });
});
