import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
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
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}
