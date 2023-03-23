/* eslint-disable react/prop-types */
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import Header from './Header';

const navigate = jest.fn();
const location = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },

  useNavigate() {
    return navigate;
  },
  useLocation() {
    return location;
  },
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderHeader() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <Header />
      </ThemeProvider>
    ));
  }

  it('헤더 메뉴 렌더링', async () => {
    renderHeader();

    await waitFor(() => {
      screen.getByText('커뮤니티');
    });
  });
});
