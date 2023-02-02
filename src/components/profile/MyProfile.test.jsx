import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import MyProfile from './MyProfile';

describe('Home', () => {
  function renderMyProfile() {
    render((
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <MyProfile />
        </ThemeProvider>
      </MemoryRouter>
    ));
  }

  it('홈페이지를 보여준다', () => {
    renderMyProfile();

    screen.getByText(/마이 페이지/);
    screen.getByText(/정보 수정/);
    screen.getByText(/팔로잉/);
    screen.getByText(/팔로워/);
    screen.getByText(/인생작품/);
  });
});
