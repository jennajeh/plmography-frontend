import styled from 'styled-components';

const Button = styled.button`
  display: block;

  width: 100%;
  padding: 0.8em 10em; 

  border: none;
  border-radius: 8px;
  cursor: pointer;

  color: ${((props) => props.theme.text.white)};
  background-color: ${((props) => props.theme.colors.primary)};

  font-size: ${((props) => props.theme.size.default)};
  font-weight: 700;

  :hover {
    color: ${((props) => props.theme.text.mouseOver)};
  }

  :active {
    color: ${((props) => props.theme.text.white)};
    background-color: ${((props) => props.theme.colors.active)};
  }

  :disabled {
    color: ${((props) => props.theme.text.white)};
    background-color: ${((props) => props.theme.colors.inactive)};
  }
`;

export default Button;
