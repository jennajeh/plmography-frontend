/* eslint-disable no-unused-vars */
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ProfileSearchPage from './ProfileSearchPage';

describe('ProfileSearchPage', () => {
  function renderProfileSearchPage() {
    render(
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme} />
        <ProfileSearchPage />
      </MemoryRouter>,
    );
  }

  it('ProfileSearchPage', () => {
    renderProfileSearchPage();
  });
});
