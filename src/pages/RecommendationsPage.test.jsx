import { render } from '@testing-library/react';
import RecommendationsPage from './RecommendationsPage';

const context = describe;

describe('RecommendationsPage', () => {
  function renderRecommendationsPage() {
    render(<RecommendationsPage />);
  }

  it('RecommendationsPage', () => {
    renderRecommendationsPage();
  });
});
