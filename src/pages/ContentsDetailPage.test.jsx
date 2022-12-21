import { render } from '@testing-library/react';
import ContentsDetailPage from './ContentsDetailPage';

const context = describe;

describe('ContentsDetailPage', () => {
  function renderContentsDetailPage() {
    render(<ContentsDetailPage />);
  }

  it('ContentsDetailPage', () => {
    renderContentsDetailPage();
  });
});
