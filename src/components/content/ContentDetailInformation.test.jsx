import {
  cleanup, render,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/defaultTheme';
import ContentDetailInformation from './ContentDetailInformation';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('ContentDetailInformation', async () => {
  render((
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>
        <ContentDetailInformation />
      </MemoryRouter>
    </ThemeProvider>
  ));
});
