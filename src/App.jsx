import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import HomePage from './pages/HomePage';
import defaultTheme from './styles/defaultTheme';
import GlobalStyle from './styles/GlobalStyle';

const Main = styled.main`
  height: calc(100vh - 64px);
`;

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}
