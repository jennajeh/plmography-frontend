import { cleanup, render } from '@testing-library/react';
import Category from './Category';

const context = describe;

describe('Category', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderCategory() {
    render((
      <Category />
    ));
  }

  it('Category', () => {
    renderCategory();
  });
});
