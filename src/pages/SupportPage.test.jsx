import { render } from '@testing-library/react';
import SupportPage from './SupportPage';

const context = describe;

describe('SupportPage', () => {
  function renderSupportPage() {
    render(<SupportPage />);
  }

  it('SupportPage', () => {
    renderSupportPage();
  });
});
