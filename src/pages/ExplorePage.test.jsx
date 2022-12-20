import { render } from '@testing-library/react';
import ExplorePage from './ExplorePage';

const context = describe;

describe('ExplorePage', () => {
  function renderExplorePage() {
    render(<ExplorePage />);
  }

  it('ExplorePage', () => {
    renderExplorePage();
  });
});
