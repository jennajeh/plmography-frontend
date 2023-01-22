import { render, screen } from '@testing-library/react';
import GreetingPage from './GreetingPage';

describe('GreetingPage', () => {
  function renderGreetingPage() {
    render(<GreetingPage />);
  }

  it('GreetingPage', () => {
    renderGreetingPage();

    screen.getByText('회원가입이 완료되었습니다.');
  });
});
