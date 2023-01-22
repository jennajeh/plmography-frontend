import { render } from '@testing-library/react';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  function renderProfilePage() {
    render(<ProfilePage />);
  }

  it('ProfilePage', () => {
    renderProfilePage();
  });
});
