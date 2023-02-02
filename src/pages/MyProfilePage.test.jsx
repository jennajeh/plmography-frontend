import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyProfilePage from './MyProfilePage';

describe('MyProfilePage', () => {
  function renderMyProfilePage() {
    render(
      <MemoryRouter>
        <MyProfilePage />
      </MemoryRouter>,
    );
  }

  it('MyProfilePage', () => {
    renderMyProfilePage();
  });
});
