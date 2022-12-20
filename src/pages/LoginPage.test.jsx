import { render } from '@testing-library/react';
import LoginPage from './LoginPage';

const context = describe;

describe('LoginPage', () => {
  function renderLoginPage() {
    render(<LoginPage />);
  }

  it('LoginPage', () => {
    renderLoginPage();
  });
});
