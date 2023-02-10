import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-size: ${((props) => props.theme.size.default)};
    background-color: ${((props) => props.theme.colors.background)};
  }

  a {
    color: ${((props) => props.theme.text.white)};
    
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
