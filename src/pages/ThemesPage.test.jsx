import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThemesPage from './ThemesPage';

const context = describe;

describe('ThemesPage', () => {
  function renderThemesPage() {
    render((
      <MemoryRouter>
        <ThemesPage />
      </MemoryRouter>
    ));
  }

  it('renders ThemesPage', () => {
    renderThemesPage();
  });
});
