import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ContentsList from './ContentsList';

const context = describe;

describe('ContentsList', () => {
  function renderContentsList() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <ContentsList />
        </MemoryRouter>
      </ThemeProvider>
    ));
  }

  it('ContentsList', () => {
    renderContentsList();
  });
});
