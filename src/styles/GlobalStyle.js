import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  a {
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
