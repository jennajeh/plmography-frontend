import { render } from '@testing-library/react';
import ModalCategory from './ModalCategory';

const context = describe;

describe('ModalCategory', () => {
  function renderModalCategory() {
    render((
      <ModalCategory />
    ));
  }

  it('ModalCategory', () => {
    renderModalCategory();
  });
});
