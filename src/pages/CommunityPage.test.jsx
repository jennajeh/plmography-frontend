import { render } from '@testing-library/react';
import CommunityPage from './CommunityPage';

const context = describe;

describe('CommunityPage', () => {
  function renderCommunityPage() {
    render(<CommunityPage />);
  }

  it('CommunityPage', () => {
    renderCommunityPage();
  });
});
