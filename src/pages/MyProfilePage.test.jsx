import { render } from '@testing-library/react';
import MyProfilePage from './MyProfilePage';

describe('MyProfilePage', () => {
  function renderMyProfilePage() {
    render(<MyProfilePage />);
  }

  it('MyProfilePage', () => {
    renderMyProfilePage();
  });
});
