import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-size: ${((props) => props.theme.size.default)};

    max-width: 1680px;
    min-width: 720px;
    min-height: 100vh;
  }

  a {
    color: ${((props) => props.theme.text.primary)};
    
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
      cursor: pointer;
  }
`;

export default GlobalStyle;
