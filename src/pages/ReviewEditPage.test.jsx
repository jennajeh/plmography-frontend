import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import ReviewEditPage from './ReviewEditPage';

test('ReviewEditPage', () => {
  render((
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>
        <ReviewEditPage />
      </MemoryRouter>
    </ThemeProvider>
  ));
});
