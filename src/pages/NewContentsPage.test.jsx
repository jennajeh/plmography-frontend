import { render } from '@testing-library/react';
import NewContentsPage from './NewContentsPage';

const context = describe;

describe('NewContentsPage', () => {
  function renderNewContentsPage() {
    render(<NewContentsPage />);
  }

  it('NewContentsPage', () => {
    renderNewContentsPage();
  });
});
