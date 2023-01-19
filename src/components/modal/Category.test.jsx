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

  function renderModalCategory() {
    render((
      <Category />
    ));
  }

  it('ModalCategory', () => {
    renderModalCategory();
  });
});
