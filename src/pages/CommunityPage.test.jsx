import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import CommunityPage from './CommunityPage';

describe('CommunityPage', () => {
  function renderCommunityPage() {
    render((
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <CommunityPage />
        </ThemeProvider>
      </MemoryRouter>
    ));
  }

  it('CommunityPage', async () => async (act) => {
    renderCommunityPage();
  });
});
