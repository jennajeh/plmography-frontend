import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import MyProfile from './MyProfile';

describe('Home', () => {
  function renderMyProfile() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <MyProfile />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  it('홈페이지를 보여준다', () => {
    renderMyProfile();

    screen.getByText(/마이 플모그래피/);
  });
});
