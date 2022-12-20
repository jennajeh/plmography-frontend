import { render } from '@testing-library/react';
import HomePage from './HomePage';

const context = describe;

describe('HomePage', () => {
  function renderHomePage() {
    render(<HomePage />);
  }

  it('HomePage', () => {
    renderHomePage();
  });
});
