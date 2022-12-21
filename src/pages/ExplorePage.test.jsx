import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ExplorePage from './ExplorePage';
import defaultTheme from '../styles/defaultTheme';

const context = describe;

describe('ExplorePage', () => {
  function renderExplorePage() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <ExplorePage />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  it('ExplorePage', () => {
    renderExplorePage();
  });
});
