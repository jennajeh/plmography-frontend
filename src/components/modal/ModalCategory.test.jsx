import { cleanup, render } from '@testing-library/react';
import ModalCategory from './ModalCategory';

const context = describe;

describe('ModalCategory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderModalCategory() {
    render((
      <ModalCategory />
    ));
  }

  it('ModalCategory', () => {
    renderModalCategory();
  });
});
