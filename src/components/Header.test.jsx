import { render } from '@testing-library/react';
import Header from './Header';

const context = describe;

describe('Header', () => {
  function renderHeader() {
    render(<Header />);
  }

  it('헤더 메뉴 렌더링', () => {
    renderHeader();
  });
});
