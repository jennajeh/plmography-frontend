/* eslint-disable no-unused-vars */
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import MyProfileEditPage from './MyProfileEditPage';

describe('MyProfileEditPage', () => {
  function renderMyProfileEditPage() {
    render(
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <MyProfileEditPage />
        </ThemeProvider>
      </MemoryRouter>,
    );
  }

  it('MyProfileEditPage', async () => async (act) => {
    renderMyProfileEditPage();
  });
});
